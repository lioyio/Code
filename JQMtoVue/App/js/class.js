//global variable Class
/*
 * 全局变量写在这个类里
 */
function GlobalVar() {
	this.webType = 'iOS';
	this.lg = 0;
	this.customer = 23;
	this.curPage = -1; //当前页面
	this.bDebug = false; //Debug开关
	this.isTriggerAlarmOut = false; //是否支持TriggerAlarmOut
	this.bNoTips = false; //禁止弹出提示语
	this.bNoHideLoader = false; //不隐藏遮罩
	this.oPercircle = null;
	this.bC23_wireless = false;
	this.bRefreshSuc = false;

	this.GetHtml = function(option) {
		var opts = $.extend({
			webUrl: "",
			callback: function(data) {}
		}, option);
		$.get(opts.webUrl, "", opts.callback, "html");
	}

	this.GetJS = function(option) {
		var opts = $.extend({
			webUrl: "",
			callback: function(data) {}
		}, option);
		$.getScript(opts.webUrl, opts.callback);
	}

	this.Ajax = function(option) {
		var opts = $.extend({
			type: "POST",
			url: "",
			contentType: "text/xml",
			processData: false,
			datatype: "text",
			timeout: 10000,
			async: false,
			suc: null,
			err: function(data, state) {}
		}, option);

		$.ajax({
			type: opts.type,
			url: opts.url,
			contentType: opts.contentType,
			processData: opts.processData,
			dataType: opts.datatype,
			timeout: opts.timeout,
			async: opts.async,
			success: function(data, state) {
				if($.isFunction(opts.suc)) {
					opts.suc(data, state)
				} else {
					vm.ShowDebugView("Globar Ajax Error");
				}
			},
			error: function(data, state) {
				opts.err(data, state);
			}
		});
	}

	this.Customer = function(customer) {
		return this.customer == customer;
	}
}

//device information Class
/*
 * 设备相关的数据在这个类里
 */
function DeviceInfo() {

	this.basicInfo = {};
	this.loginRsp = {};
	this.bInit = 0;
	this.id = 0; //Log in successfully returns the id
	this.devState = []; //Channel, the length of the array is equal to the channel number
	this.devType = devTypeEnum.DEV_NVR;
	this.password = '';
	this.bLanguage = function(p) {
		return(this.bInit >> 4 & 0x1);
	}
	this.setLoginRsp = function(data) {
		this.loginRsp = data;
		this.devType = this.loginRsp.HighType >> 8 & 0xf;
		for(var i = 0; i < this.loginRsp.ChannelNum; i++) {
			this.devState[i] = {};
			this.devState[i].CurChnState = 2; //default
		}
	}
	this.setDevAllStatusRpt = function(data) {
		for(var i = 0; i < this.loginRsp.ChannelNum; ++i) {
			this.devState[i].PageIntelligentChn = data.PageIntelligentChn[i];
			this.devState[i].InputNum = data.InputNum[i];
			this.devState[i].OutputNum = data.OutputNum[i];
		}
	}
	this.hasPreviewRight = function(ch) {
		if(this.loginRsp.UserPreview * 1) {
			if(ch < 32) {
				return this.loginRsp.PreviewChannel >> ch & 1;
			} else {
				var index = parseInt((ch - 32) / 32);
				var pos = ch % 32;
				return this.loginRsp.PreviewChannel_EX[index] >> pos & 1;
			}
		}
		return false;
	}

	this.hasPlaybackRight = function(ch) {
		if(this.loginRsp.UserPlayBack * 1) {
			if(ch < 32) {
				return this.loginRsp.PlayBackChannel >> ch & 1;
			} else {
				var index = parseInt((ch - 32) / 32);
				var pos = ch % 32;
				return this.loginRsp.PlayBackChannel_EX[index] >> pos & 1;
			}
		}
		return false;
	}

	this.hasBackupRight = function(ch) {
		if(this.loginRsp.UserBackup * 1) {
			if(ch < 32) {
				return this.loginRsp.BackupChannel >> ch & 1;
			} else {
				var index = parseInt((ch - 32) / 32);
				var pos = ch % 32;
				return this.loginRsp.BackupChannel_EX[index] >> pos & 1;
			}
		}
		return false;
	}

	this.hasPtzRight = function(ch) {
		if(this.loginRsp.UserPtzControl * 1) {
			if(ch < 32) {
				return this.loginRsp.PtzControlChannel >> ch & 1;
			} else {
				var index = Math.floor((ch - 32) / 32);
				var pos = ch % 32;
				return this.loginRsp.PtzControlChannel_Ex[index] >> pos & 1;
			}
		}
		return false;
	}

	this.hasUserSetRight = function(right) {
		if(this.loginRsp.UserSetRight >> right & 1)
			return true;
		else
			return false;
	}

	this.getChannelName = function(chIndex) {
		var channelName;
		var chnTotalNum = this.loginRsp.ChannelNum;
		var analogNum = this.loginRsp.AnalogChNum;
		var chnNum = chIndex < 9 ? '0' + (chIndex + 1) : (chIndex + 1);
		if(this.devType == devTypeEnum.DEV_DVR || this.devType == devTypeEnum.DEV_NVR || this.devType == devTypeEnum.DEV_IPC) { // DVR or NVR or IPC
			channelName = lg.IDS_CH + chnNum;
		} else if(this.devType == devTypeEnum.DEV_HDVR) {
			if((analogNum != 0) && (analogNum == chnTotalNum)) { //Hybird DVR
				channelName = lg.IDS_CH + chnNum;
			} else if(analogNum == 0) { //Hybird NVR
				channelName = lg.IDS_CH + chnNum;
			} else if(analogNum > 0 && analogNum < chnTotalNum) { //Hybird
				if(chIndex < analogNum) {
					channelName = lg.IDS_CH + chnNum;
				} else if(chIndex >= analogNum && chIndex < chnTotalNum) {
					var _IPChnNum = (chIndex - analogNum) < 9 ? '0' + (chIndex - analogNum + 1) : (chIndex - analogNum + 1);
					var _IPChnStr = "IP " + lg.IDS_CH; //IP CH
					if((this.devState[chIndex].Abilities >> AbilityTypeEnum.SUPPROT_WIREFREE) & 1) {
						_IPChnStr = "W-" + lg.IDS_CH; //W-CH
					}
					channelName = _IPChnStr + _IPChnNum;
				}
			}
		}
		return channelName;
	};

	this.getChannelType = function(chNum, anNum, state) {
		var str = '',
			i, type = '',
			status;
		if(typeof state == "undefined") {
			status = CHNStatus.CHN_ONLINE;
		} else {
			status = state;
		}
		if(anNum > 0) { // analog channel
			for(i = 0; i < chNum; i++) {
				var uiNum;
				if(i < anNum) {
					type = 'CH';
					uiNum = i + 1;
				} else {
					type = 'IP CH';
					uiNum = i + 1 - anNum;
				}

				var uiNum = (uiNum < 10) ? ('0' + uiNum) : uiNum;

				if(this.devState[i].CurChnState == status) {
					if(vm.gVar.bHide_IntelPage_HalfAnalogCh) {
						if(i < anNum) {
							if(i < (anNum / 2)) {
								str += '<option class="option" value="' + i + '">' + type + (uiNum) + '</option>';
							}
						} else {
							str += '<option class="option" value="' + i + '">' + type + (uiNum) + '</option>';
						}
					} else {
						if(this.devType == devTypeEnum.DEV_HDVR) {
							if(i < anNum) {
								str += '<option class="option" value="' + i + '">' + type + (uiNum) + '</option>';
							} else {
								if(this.devState[i].ProtocolType == 17) {
									continue; //this channel can not set param,don't show
								}
								str += '<option class="option" value="' + i + '">' + type + (uiNum) + '</option>';
							}
						} else {
							str += '<option class="option" value="' + i + '">' + type + (uiNum) + '</option>';
						}
					}
				}
			}
		} else {
			type = 'CH';
			for(i = 0; i < chNum; i++) {
				if(this.devState[i].CurChnState == status) {
					str += '<option class="option" value="' + i + '">' + type + (((i + 1) < 10) ? ('0' + (i + 1)) : (i + 1)) + '</option>';
				}
			}
		}
		return str;
	}

	this.isOnline = function(ch) {
		if(this.loginRsp.ZeroChFlag && ch == this.loginRsp.ChannelNum)
			return true;
		return(this.devState[ch].CurChnState == CHNStatus.CHN_ONLINE);
	}

	this.isSleep = function(ch) {
		return(this.devState[ch].CurChnState == CHNStatus.CHN_SLEEP);
	}

	this.hasAbility = function(ch, n) { //ability of judgement
		if(ch >= this.devState.length) {
			return false;
		}
		return(((this.devState[ch].Abilities >> n) & 1) == 1);
	}

	this.hasIntelligentAbilities = function(ch, n) { //ability of judgement
		return(((this.devState[ch].PageIntelligentChn >> n) & 1) == 1);
	}

	this.GetPageControl = function(n) {
		return((this.loginRsp.PageControl >> n) & 1 == 1);
	}

	this.GetPageControl2 = function(n) {
		return((this.loginRsp.PageControl2 >> n) & 1 == 1);
	}

	this.GetControlBit = function(n) {
		return((this.loginRsp.ControlBit >> n) & 1 == 1);
	}

	this.GetControlBit2 = function(n) {
		return((this.loginRsp.ControlBit2 >> n) & 1 == 1);
	}

	this.GetControlBitArray = function(n) {
		return((this.loginRsp.ControlBitArray[Math.floor(n / 32)] >> (n % 32) & 1) == 1);
	}

	this.isDevType = function(n) {
		return this.devType == n;
	}

	this.isProtocolType = function(ch, n) {
		return this.devState[ch].ProtocolType == n;
	}
	this.isUI5_0 = function(p) {
		return this.loginRsp.UiType == 50;
	}
	this.isUI5_2 = function(p) {
		return this.loginRsp.UiType == 52;
	}
}