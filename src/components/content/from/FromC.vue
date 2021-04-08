<template>
  <div id="">
      <p>��userId����<div><input ref="userId" name="userId" type="text" value="10"></div>
      <p>��toUserId����<div><input ref="toUserId" name="toUserId" type="text" value="20"></div>
      <p>��toUserId����<div><input ref="contentText" name="contentText" type="text" value="hello websocket"></div>
      <button @click="openSocket">aaa</button>
      <button @click="sendMessage">bbb</button>
  </div>
</template>
<script>
export default {
  name:'FromC',
  components: {},
  data() {
    return {
        socket: ''
    }
 },
  computed: {},
  created() {},
  mounted() {
   
  },
  methods: {
           openSocket() {
               this.$socket.open() 
        // if(typeof(WebSocket) == "undefined") {
        //     console.log("您的浏览器不支持WebSocket");
        // }else{
        //     console.log("您的浏览器支持WebSocket");
        //     //ʵ�ֻ�WebSocket����ָ��Ҫ���ӵķ�������ַ��˿�  ��������
        //     //��ͬ��socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
        //     //var socketUrl="this.refs{request.contextPath}/im/"+this.refs("#userId").val();
        //     var socketUrl="http://localhost:8084/webSocket/v1/webSocketServer/"+ this.$refs.userId.innerText;
        //     socketUrl=socketUrl.replace("https","ws").replace("http","ws");
        //     console.log(socketUrl);
        //     if(this.socket!=null){
        //         this.socket.close();
        //         this.socket=null;
        //     }
        //     this.socket = new WebSocket(socketUrl);
        //     //���¼�
        //     this.socket.onopen = function() {
        //         console.log("websocket已打开");
        //         //this.socket.send("�������Կͻ��˵���Ϣ" + location.href + new Date());
        //     };
        //     //�����Ϣ�¼�
        //     this.socket.onmessage = function(msg) {
        //         console.log(msg.data);
        //         //������Ϣ����    ��ʼ����ǰ�˴����߼�
        //     };
        //     //�ر��¼�
        //     this.socket.onclose = function() {
        //         console.log("websocket已关闭");
        //     };
        //     //�����˴����¼�
        //     this.socket.onerror = function() {
        //         console.log("websocket发生了错误");
        //     }
        // }
    },
     sendMessage() {
        if(typeof(WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        }else {
            console.log("您的浏览器支持WebSocket");
            console.log('{"toUserId":"'+this.$refs.toUserId.innerText+'","contentText":"'+this.$refs.contentText.innerText+'"}');
            this.socket.send('{"toUserId":"'+this.$refs.toUserId.innerText+'","contentText":"'+this.$refs.contentText.innerText+'"}');
        }
    }
  },
};
</script>

<style scoped lang="scss">

</style>
