<template>
	<div class="tenants-box" ref="box">
		<main-header :text="text" @back="back"></main-header>
		<div class="tenants-zi">
			<div class="Qr-code">
				<div>
					<canvas id="canvas"></canvas>
					<p>{{shopjie}}</p>
				</div>
			</div>
			<div class="steps" ref="list" :style="{'height':dom + 'px'}">
				<h3>入驻步骤:</h3>
				<iframe :src="txt" height="90%" width="100%" frameborder="0"></iframe>
			</div>
		</div>
	</div>
</template>

<script>
	// import MainHeader from "@/components/component/mainHeader";
	import Request from "@/common/js/request";
	// import QRCode from "qrcode"; //二维码生成
	export default {
		data() {
			return {
				text: "商家入驻",
				shopjie: "",
				ershop: "",
				txt: "",
				dom: 0
			};
		},
		components: {
			// MainHeader
		},
		mounted() {
      		this.getshop();
			// this.dom = this.$refs.box.offsetHeight - 270 
		},
		methods: {
			back() {
				this.$router.push("/person");
			},
			getshop() {
				let goCarlist = {
					cmd: "businessEntry"
				};
				Request.postRequest(goCarlist)
					.then(res => {
						console.log(res);
						if (res.result == 0) {
							this.shopjie = res.alt;
							this.ershop = res.qrCode;
							this.txt = res.content;

							// this.useqrcode(this.ershop);
						}
					})
					.catch(res => {
						// Toast("获取失败");
					});
			},
			// useqrcode(www) {
			// 	//二维码生成
			// 	console.log(www);
			// 	var canvas = document.getElementById("canvas");
			// 	QRCode.toCanvas(canvas, www, function(error) {
			// 		if (error) console.error(error);
			// 		console.log("二维码生成成功!");
			// 	});
			// }
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.tenants-box {
		width: 100%;
		height: 100%;
	}
	
	.tenants-zi {
		width: 100%;
		height: 100%;
		padding: 50px 10px 0;
		box-sizing: border-box;
		overflow: hidden;

		.Qr-code {
			height: 200px;

			div {
				width: 200px;
				margin: 30px auto;
				text-align: center;
			}
		}

		.steps {
			width: 100%;
			// height: 100%;
			padding: 0 0.4rem;
			box-sizing: border-box;
			h3 {
				padding-bottom: 5px;
			}
		}
	}
</style>
