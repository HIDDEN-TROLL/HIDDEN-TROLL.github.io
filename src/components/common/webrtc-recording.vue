<template>
    <div id="add-community">
        <div class="top_time">
            <van-row>
                <van-col span="8"><button class="record2" @click="back"><van-icon name="arrow-left" /></button></van-col>
            </van-row>

        </div>
        <div class="top_time" v-if="endrec === true">
            <van-row>
                <van-col span="8"><button id="record2" @click="back"><van-icon name="arrow-left" /></button></van-col>
                <van-col span="8"><button id="repload" @click="reload"><van-icon style="font-size: 0.3rem;line-height: 0.5rem;" name="cross" /></button></van-col>
                <van-col span="8"><button id="download" @click="download"><van-icon name="success" /></button></van-col>
            </van-row>
        </div>
        <div class="time">
            0:{{second}}
        </div>
        <div id="container">
          <div :class="replay === true ? 'playvideoSe' : 'playvideo' " >
              <video id="gum"  playsinline autoplay muted ></video>
          </div>
          <div :class="{ replay : replay}" >
              <video id="recorded" playsinline loop></video>
          </div>
            <div class="bottom_btn" v-if="endrec === false">
                <button id="record"   @click="recored" :class="{off : off}"></button>
            </div>
        </div>
    </div>
</template>

<script>
    import { NavBar, Field, Uploader, Icon, Toast,Row, Col,Progress,Dialog  } from 'vant';
    import Player from './player'
    import draggable from 'vuedraggable'
    export default {
        name: "add-community",
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Uploader.name]: Uploader,
            [Dialog.name]: Dialog,
            [Icon.name]: Icon,
            [Toast.name]: Toast,
            [Row.name]:Row,
            [Progress .name]:Progress ,
            [Col.name]:Col,
            Player: Player,
            draggable:draggable,
        },
        props:{
            showWebrtc:null
        },
        data() {
            return {
                src:'',
                test:[],
                playButton:'',
                // 录像中判断参数
                off:true,
                recordedBlobs:null,
                options:null,
                mediaRecorder:null,
                url:null,
                replay:true,

                fileUrl:'',
                blob:null,
                time:'00:00',
                // 停止录像
                endrec:false,
                // 计时
                second:0,
                addTime:false,
                timer:null,

                stream:null
            }
        },
        methods: {
            back(){
                console.log(true)
                clearInterval(this.timer)
                this.off = true
                this.mediaRecorder = ''
                this.src = ''
                this.test = ''
                this.url = ''
                this.endrec = false
                this.second = 0
                this.$emit('close',true)
            },
            // 打开摄像头
            open(){
                Toast("打开摄像头")
                this.replay = true
                console.log("开启摄像头")
                const constraints = {
                    audio: {
                        echoCancellation: {exact: false}
                    },
                    video: {
                        width:640, height: 480,facingMode: "environment"
                    }
                };
                console.log('摄像头配置信息:', constraints);
                this.init(constraints);
            },
            init(constraints) {
                Toast("打开成功")
                try {
                    // const stream = navigator.mediaDevices.getUserMedia(constraints);
                    if(navigator.mediaDevices.getUserMedia){
                        //最新标准API
                        // navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
                        this.stream = navigator.mediaDevices.getUserMedia(constraints);
                    } else if (navigator.webkitGetUserMedia){
                        //webkit内核浏览器
                        // navigator.webkitGetUserMedia(constrains).then(success).catch(error);
                        this.stream = navigator.webkitGetUserMedia(constraints);
                    } else if (navigator.mozGetUserMedia){
                        //Firefox浏览器
                        // navagator.mozGetUserMedia(constrains).then(success).catch(error);
                        this.stream = navigator.mozGetUserMedia(constraints);
                    } else if (navigator.getUserMedia){
                        //旧版API
                        // navigator.getUserMedia(constrains).then(success).catch(error);
                        this.stream = navigator.getUserMedia(constraints);
                    }
                    this.handleSuccess(this.stream);
                } catch (e) {
                    alert('调用摄像头出错',e)
                    console.error('调用摄像头出错:', e);
                }
            },
            handleSuccess(stream) {
                Toast("成功调用，生成图像中")
                // then参数回调获取[[promiseValue]]
                // 摄像头路径
                let url = {}
                let timer2 = setTimeout(()=>{
                    this.$loadingHide()
                    this.test = stream
                        stream.then((res)=>{
                            url = res
                            const gumVideo = document.querySelector('video#gum');
                            gumVideo.srcObject = url;
                            // window.stream = stream;
                            console.log('getUserMedia() got stream:', url);
                        }).catch((e) => {
                            this.second = e+"你的手机/设备不安全无法调用摄像头"
                            alert("获取摄像头显示路径出错！",e)
                            throw new Error("获取摄像头显示路径出错！")
                        })
                },1500)
            },
            // 重新录制
            reload(){
                Dialog.confirm({
                    title: '确定操作',
                    message: '确定要重新录制视频吗？'
                })
                    .then(() => {
                        // on confirm
                        this.mediaRecorder = ''
                        this.src = ''
                        this.test = ''
                        this.url = ''
                        this.endrec = false
                        this.second = 0
                        this.open()
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
            // 录像
            // 判断是否录像中
            recored(){
                    if (this.off === true) {
                        console.log("off")
                        this.$toast("开始录像")
                        this.startRecording();
                        this.recTime()
                    } else {
                        console.log("on")
                        this.stopRecording();
                        this.off = true
                    }
            },
            recTime(){
                if(this.addTime === false){
                    if(this.second < 15){
                        this.timer = setTimeout(()=>{
                            this.second+=1
                            this.recTime()
                        },1000)
                    }else{
                        clearInterval(this.timer)
                        this.off = true
                        this.stopRecording();
                    }
                }
            },
            // 开始录制
            startRecording() {
                this.addTime = false

                console.log("录像执行")
                this.recordedBlobs = [];
                this.options = {mimeType: 'video/webm;codecs=vp9'};
                if (!MediaRecorder.isTypeSupported(this.options.mimeType)) {
                    console.log("错误1")
                    this.options = {mimeType: 'video/webm;codecs=vp8'};
                    if (!MediaRecorder.isTypeSupported(this.options.mimeType)) {
                        console.log("错误2")
                        this.options = {mimeType: 'video/webm'};
                        if (!MediaRecorder.isTypeSupported(this.options.mimeType)) {
                            console.log("错误3")
                            this.options = {mimeType: ''};
                        }
                    }
                }
                    console.log("转化设置")
                    this.test.then
                        ((res)=>{
                            let url = res
                            console.log('getUserMedia() got stream:', url);
                            this.url = url
                            console.log("获取录像地址",this.url,this.options)
                            this.mediaRecorder = new MediaRecorder(this.url,this.options)
                            this.off = false
                            this.mediaRecorder.onstop = (event) => {
                                console.log('Recorder stopped: ', event,event.timeStamp);
                            };
                            this.mediaRecorder.ondataavailable = this.handleDataAvailable;
                            this.mediaRecorder.start(10); // collect 10ms of data
                            console.log("options",this.options)
                        }).catch((e) => {
                            alert(e)
                            throw new Error("异常！")
                        })
                    console.log("获取地址",this.test)
            },
            handleDataAvailable(event) {
                if (event.data && event.data.size > 0) {
                    this.recordedBlobs.push(event.data);
                }
            },
            stopRecording() {
                // 停止计时
                this.addTime = true
                console.log("录像停止",this.mediaRecorder)
                this.mediaRecorder.stop();
                console.log('Recorded Blobs: ', this.recordedBlobs);
                this.$loading('保存中',null,true)
                this.play()
            },

            // 播放
            play(){
                let timer1 = setTimeout(()=>{
                    this.$loadingHide()
                    console.log("播放1")
                    const recordedVideo = document.querySelector('video#recorded');

                    const superBuffer = new Blob(this.recordedBlobs, {type: 'video/webm'});
                    recordedVideo.src = null;
                    recordedVideo.srcObject = null;
                    recordedVideo.src = window.URL.createObjectURL(superBuffer);
                    recordedVideo.controls = true;
                    recordedVideo.play();

                    this.endrec = true
                    this.replay = false
                },2800)
            },

            // 获取视频上传所需地址/下载
            download(){
                this.$loading("加载中",null,true)
                const blob = new Blob(this.recordedBlobs, {type: "video/mp4"});
                const url = window.URL.createObjectURL(blob);

                // 下载视频
                // const a = document.createElement('a');
                // a.style.display = 'none';
                // a.href = url;
                // a.download = 'test.webm';
                // document.body.appendChild(a);
                // a.click();

                // 获取base64格式↓
                this.fileUrl = new FileReader();
                this.fileUrl.readAsDataURL(blob);
                // 获取base64格式↑

                this.$loadingHide()

                Dialog.confirm({
                    title: '确定操作',
                    message: '确定上传该视频？'
                })
                    .then(() => {
                        // on confirm
                        setTimeout(() => {
                            // document.body.removeChild(a);
                            // window.URL.revokeObjectURL(url);
                            // var file = new File([blob],'name', {type: 'video/webm', lastModified: Date.now()});
                            console.log("下载2",this.recordedBlobs, blob, this.fileUrl.result)
                            if(blob){
                                this.$emit('uploadwebrtc',blob)
                                this.$emit('close',true)
                            }
                        }, 1500);
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
        },
        created() {
            navigator.getUserMedia ||
            (navigator.getUserMedia = navigator.mozGetUserMedia ||  navigator.webkitGetUserMedia || navigator.msGetUserMedia);
            if (navigator.getUserMedia) {
                this.$loading('开启摄像头中',null,true)
                let timer3 = setTimeout(()=>{
                    this.open()
                    clearInterval(timer3)
                },2800)
            } else {
                this.$loading('开启摄像头中',null,true)
                let timer4 = setTimeout(()=>{
                    this.open()
                    clearInterval(timer4)
                },2800)
            }

            this.playButton = document.querySelector('button#play');

        },
    }
</script>

<style scoped lang="less">
    *{
        font-size: 0.12rem;
    }
    .hidden {
        display: none;
    }
    .highlight {
        background-color: #eee;
        font-size: 1.2em;
        margin: 0 0 30px 0;
        padding: 0.2em 1.5em;
    }
    .warning {
        color: red;
        font-weight: 400;
    }
    @media screen and (min-width: 1000px) {
        /* hack! to detect non-touch devices */
        div#links a {
            line-height: 0.8em;
        }
    }
    audio {
        max-width: 100%;
    }
    body {
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        margin: 0;
        padding: 1em;
        word-break: break-word;
    }
    button {
        background-color: white;
        border: none;
        border-radius: 2px;
        color: #269a00;
        font-family: 'Roboto', sans-serif;
        font-size: 0.8em;
        margin: 0 0 1em 0;
    }
    canvas {
        background-color: #ccc;
        max-width: 100%;
        width: 100%;
    }
    div#container {
        margin: 0 auto 0 auto;
        max-width: 60em;
        /*padding: 1em 1.5em 1.3em 1.5em;*/
    }
    div#links {
        padding: 0.5em 0 0 0;
    }
    li {
        margin: 0 0 0.4em 0;
    }
    html {
        overflow-y: scroll;
    }
    img {
        border: none;
        max-width: 100%;
    }
    input[type=radio] {
        position: relative;
        top: -1px;
    }
    p#data {
        border-top: 1px dotted #666;
        font-family: Courier New, monospace;
        line-height: 1.3em;
        max-height: 1000px;
        overflow-y: auto;
        padding: 1em 0 0 0;
    }
    section p:last-of-type {
        margin: 0;
    }
    section {
        border-bottom: 1px solid #eee;
        margin: 0 0 30px 0;
        padding: 0 0 20px 0;
    }
    section:last-of-type {
        border-bottom: none;
        padding: 0 0 1em 0;
    }
    select {
        margin: 0 1em 1em 0;
        position: relative;
        top: -1px;
    }
    video {
        background: #222;
        --width: 100vw;
        width: var(--width);
        height: 100vh

    }
    @media screen and (max-width: 450px) {
        h1 {
            font-size: 20px;
        }
    }
    button {
        margin: 0 3px 10px 0;
        /*padding-left: 2px;*/
        /*padding-right: 2px;*/
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 100%;
    }

    button:last-of-type {
        margin: 0;
    }

    p.borderBelow {
        margin: 0 0 20px 0;
        padding: 0 0 20px 0;
    }
    video:last-of-type {
        /*margin: 0 0 20px 0;*/
    }
    video#gumVideo {
        /*margin: 0 20px 20px 0;*/
    }
    .playvideo{
        display: none;
    }
    .playvideoSe{
        display: block;
    }
    .replay{
        z-index: 1;
        display: none;
    }
    .bottom_btn{
        position: fixed;
        z-index: 50;
        bottom: 9vh;
        width: 100vw;
        text-align: center;
    }
    .top_time{
        position: fixed;
        z-index: 99999;
        /*background: black;*/
        height: 0.6rem;
        top: 20px;
        width: 100vh;
        text-align: center;
    }
    .time{
        position: fixed;
        z-index: 999999;
        height: 0.6rem;
        top: 0.8rem;
        width: 100vw;
        line-height: 0.6rem;
        text-align: center;
        color: white;
        font-size: 0.2rem;
    }
    /deep/.van-col--8 {
        width: 33.3vw;
    }
    .off{
        background: red;
    }
    #download{
        width: 0.3rem;
        height: 0.3rem;
    }
    #record2{
        width: 0.3rem;
        height: 0.3rem;
    }
    .record2{
        width: 0.3rem;
        height: 0.3rem;
    }
    #repload{
        color: black;
    }
</style>
