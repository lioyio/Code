var devTypeEnum = {
	DEV_DVR: 0, //simulation DVR
	DEV_MVR: 1, //vehicle-mounted
	DEV_INTEL: 2,
	DEV_NVR: 3, //NVR
	DEV_IPC: 4, //IPC
	DEV_HDVR: 6 //HDVR
}

var CHNStatus = {
	CHN_BOTTOM: -1,
	/*Did not add*/
	CHN_NETWRONG: 0,
	/*Unable to connect to the IPC*/
	CHN_UNAUTHER: 1,
	/*Failed user authentication*/
	CHN_ONLINE: 2,
	/*be connected successfully,auto open preview*/
	CHN_CONNECT: 3,
	/*connecting*/
	CHN_BANDLIMIT: 4,
	/*Stream restricted and be disconnected*/
	CHN_VIDEOLOSS: 5,
	CHN_SLEEP: 6 /*device is online,bug in sleep state,need manually open preview*/
}

var alarmEnum = {
	MsgPirAlarm: 187,
	MsgVLossAlarm: 189,
	MsgDevStatReport: 190,
	MsgMotionAlarm: 191,
	MsgIOAlarm: 192,
	MsgFtpUpgradeAlarm: 203,
	MsgIntelPeaAlarm: 205,
	MsgOscRuleAlarm: 206,
	MsgVideoHideAlarm: 207,
	MsgBitrateInfo: 208,
	MsgRecordStatusReport: 212,
	MsgHddStatusReport: 213,
	MsgIntelIpcPeaAlarm: 215,
	MsgIpcOSCAlarm: 216,
	MsgIntelIpcPeaAreaAlarm: 218,
	MsgAlarmIntManage: 251,
	MsgAlarmFishEyeIpcStat: 252,
	MsgAlarmPTZIpcStat: 253,
	MsgDevPreviewChangeReport: 258,
	MsgDevAllStatusReq: 610,
	MsgRemoteCHStatusReq: 611,
	MsgStatusRequest: 890
};

var paramPage = {
	MsgJsonTypeMsg: 429,
	MsgParamSystemBase: 502,
	MsgParamHdd: 503,
	MsgParamUser: 505,
	MsgParamColor: 508,
	MsgParamVideoCover: 509,
	MsgParamPtz: 510,
	MsgParamNetworkBase: 511,
	MsgParamDDNS: 512,
	MsgParamEmail: 514,
	MsgParamMotion: 516,
	MsgParamAbnormal: 517,
	MsgParamIOAlarm: 518,
	MsgParamRecord: 519,
	MsgParamSchedule: 520,
	MsgParamDefault: 521,
	MsgParamIntelligent: 522,
	MsgParamGeneral: 524,
	MsgParamMaintain: 525,
	MsgParamPlatform: 529,
	MsgParamIpc: 530,
	MsgParam3G: 533,
	MsgParamIPFilter: 547,
	MsgParamRtsp: 548,
	MsgParamFtp: 549,
	MsgParamFtpAutoUpgrade: 556,
	MsgParamSystemIDCtrl: 558,
	MsgParamNormalCloSto: 563,
	MsgParamNormalCloStoEm: 564,
	MsgParamPerimeterLine: 566,
	MsgParamGoodsLostLegacy: 568,
	MsgParamModifyMainStream: 570,
	MsgParamModifySubStream: 571,
	MsgParamModifyMobileStream: 572,
	MsgParamModifyLiving: 573,
	MsgParamModifyEmailSchedule: 578,
	MsgParamVoice: 581,
	MsgParamIDSet: 582,
	MsgParamIntelliRec: 585,
	MsgParamIPCImageSet: 587,
	MsgParamCustomProtocol: 589,
	MsgParamOD: 592,
	MsgParamAnalogCam: 597,
	MsgParamIPCROI: 591,
	MsgParamCaptureSet: 598,
	MsgParamCapSchedule: 599,
	MsgParamChnInfo: 701,
	MsgParamRecInfo: 702,
	MsgParamPerimeter: 703,
	MsgParamIntHD: 705,
	MsgParamIntFD: 706,
	MsgParamIntPCC: 707,
	MsgParamIntManage: 708, // 2016.03.09
	MsgParamElectricityGrid: 709,
	MsgParamFtpAutoUpgrade: 556,
	MsgParamSystemIDCtrl: 558,
	MsgParamZeroChn: 601,
	MsgParamFishEye: 711, // 2016.08.29
	MsgParamSwitch: 713,
	MsgParamIPCCameaFocusInfo: 714,
	MsgParamPreviewCtrl: 715,
	MsgParamSwannWifi: 717,
	MsgParamGB28181: 722,
	MsgParamPir: 723,
	MsgParamJDVCAMeterRecongition: 724,
	MsgParamJDVCAIntrusionDetection: 725,
	MsgParamJDVCARedMantleDetection: 726,
	MsgParamUrmetHttp: 804,
	MsgParamNewCloudestorage: 805,
	MsgParamOutPut: 807,
	MsgNewIOAlarm: 808,
	MsgParamNetFilter: 809,
	MsgParamALTEReport: 810,
	MsgParamNewEmail: 813,
	MsgParamAlarmLinkagePTZ: 814,
	MsgParamModifyAlarmStream: 815,
	MsgParamXINQIAOFaceDetection: 817,
	MsgParamIOAlarmManage: 818,
	MsgParamIeee8021xParam: 819,
	MsgParamHttps: 822,
	MsgParamCertificates: 823,
	MsgParamSnmp: 825,
	MsgHGIntParam: 826,
	MsgdropboxParam: 828,
	MsgFloodLightParam: 838,

	MsgParamDevLog: 160608,
	MsgParamScheduleIPC: 160825,
	MsgParamExportIPC: 161121,
	MsgParamTour: 171109
}

var paramPageJson = {
	WIRELESS_CAMERA:'wifiCameraInfo',
    CHANNEL_CONFIG:'channelConfigInfo',
    SYSINF_HDD:'HddInfo',
    ALARM_MOTION:'MotionInfo',
    ALARM_PIR:'PirInfo',
    ALARM_IO:'IoInfo',
    ALARM_PID:'PerimeterZoneInfo',
    ALARM_LCD:'PerimeterLineInfo',
    ALARM_SOD:'GoodsLostLegacyInfo',
    ALARM_PD:'PedestrianInfo',
    ALARM_FD:'FaceInfo',
    ALARM_CC:'CrossCountInfo',
    ALARM_SD:'SoundInfo',
    ALARM_OD:'ODInfo',
    ALARM_ABNORMAL:'AbnormalInfo',
    ALARM_SCHEDULE:'AlarmScheduleInfo',
    INTELLIGENT_PAGE:'ParamIntInfo',
    FTP_AUTOUPGRADE:'FtpUpgradeInfo',
    IPC_PARAM:'IpcParam',
    ACTIVE_GOOGLE:'activateGoogleDevice',
    FTP_SET:'FtpInfo',
    DEV_LOG:'LOG_getlogInfo',
    ALARM_LINKAGE:'AlarmLinkageInfo',
}

var methodEnum = {
	MsgNoType: 0,
	MainMsgInitPlugin: 1,
	MainMsgUnInitPlugin: 2,
	MainMsgUserLogin: 3,
	MainMsgUserLogout: 4,
	MainMsgPreview: 5,
	SubMsgPreviewStart: 6,
	SubMsgPreviewStop: 7,
	SubMsgPreviewCodeType: 8, //main stream or sub stream
	SubMsgCapture: 9,
	SubMsgRecord: 10,
	SubMsgPreviewRatio: 11,

	MainMsgSearchRec: 12,
	SubMsgSearchDay: 13,
	SubMsgSearchMonth: 14,
	MainMsgSetPlayBackMode: 15,
	MainMsgGetLoginInfo: 16,
	SubMsgSound: 17,
	MainMsgPathInfo: 18,
	SubMsgGetPathInfo: 19,
	SubMsgGetSelPath: 20,
	SubMsgSetPathInfo: 21,
	MainMsgGetLanguage: 22,
	SubMsgPlaybackCapSuccess: 23, //
	SubMsgPlaybackCapFail: 24,
	MainMsgBrowserFile: 25,
	SubMsgBrowserPic: 26,
	SubMsgBrowserDir: 27,
	MainMsgGetOcxVersion: 28,
	SubMsgZoomView: 29,
	MainMsgPTZcontrol: 30,
	MainMsgGetWeekStart: 31,
	MainMsgChangePage: 32,
	MainMsgGetAndSetParameter: 33,
	SubMsgGetParameter: 34,
	SubMsgSetParameter: 35,
	MainMsgRemoteUpgrade: 36,
	SubMsgGetUpgradeFile: 37,
	SubMsgStartUpgrade: 38,
	SubMsgStopUpgrade: 39,
	MainMsgCtrlParamPageVideo: 40,
	MainMsgRemoteTest: 41,
	SubMsgPlaybackRecSuccess: 42,
	SubMsgPlaybackRecFail: 43,
	MainMsgBitrate: 44,
	MainMsgGetSysLangType: 45,
	MainMsgDisconnection: 46,
	MainMsgTalkerOperator: 47,
	MainMsgSetGoodLAreaStatus: 48,
	MainMsgPLWriteLine: 49,
	MainMsgPLWriteLineTwoway: 50,
	MainMsgGLLRuleType: 51,
	MainMsgRuleNum: 52,
	MainMsgSelectResolutionset: 53,
	MainMsgRemoteParamBackup: 54,
	SubMsgGetParamFile: 55,
	SubMsgSetParamFile: 56,
	SubMsgPreviewInit: 57,
	SubMsgPreviewSplit: 58,
	SubMsgPreviewPrePage: 59,
	SubMsgPreviewNextPage: 60,
	MainMsgDebugFlag: 61,
	MainMsgInitWindow: 62,
	SubMsgInitPreview: 63,
	SubMsgInitPlayback: 64,
	SubMsgInitLiveParam: 65,
	SubMsgInitMotionParam: 66,
	SubMsgInitImgControlParam: 67,
	SubMsgInitPrivacyZoneParam: 68,
	SubMsgInitWindowAll: 69,
	SubMsgPreviewPageIndex: 70,
	SubMsgFullScreen: 71,
	SubMsgSelectWnd: 72,
	SubMsgResetIndex: 73,
	SubMsgGetViewsIndex: 74,
	MainMsgPlayback: 75,
	SubMsgPlaybackStart: 76,
	SubMsgPlaybackStop: 77,
	SubMsgPlaybackSplit: 78,
	SubMsgPlaybackCodeType: 79,
	SubMsgPlaybackRatio: 80,
	SubMsgPlaybackPlayMode: 81,
	SubMsgPlaybackPageIndex: 82,
	SubMsgGetPlaybackTime: 83,
	SubMsgSetPlaybackTime: 84,
	MainMsgParamvideo: 85,
	SubMsgParamChangeChn: 86,
	SubMsgDownloadStart: 87,
	SubMsgDownloadStop: 88,
	SubMsgDownloadStatus: 89,
	MainMsgTimeline: 90,
	MainMsgDownloadBox: 91,
	SubMsgInitTimeline: 92,
	SubMsgInitTimelineData: 93,
	SubMsgShowMovePointer: 94,
	SubMsgHideMovePointer: 95,
	SubMsgDownloadInit: 96,
	SubMsgDownloadData: 97,
	SubMsgSetVolume: 98,
	SubMsgSetSync: 99,
	SubMsgTimelineZoom: 100,
	MainMsgDualTalk: 101,
	SubMsgDbclkFullscreen: 102,
	SubMsgFishEye: 103,
	SubMsgFishEyePtzPos: 104,
	MainMsgAutoUpgrade: 105,
	MainMsgModifyPsw: 106,
	SubMsgBitrate: 107,
	SubMsgSetColor: 108,
	MainMsgExportEXCEL: 109,
	SubMsgFishEyeSoftPtz: 110,
	SubMsgSetFishEyeSoftMode: 111,
	MainMsgIPCSaveToDev: 112,
	SubMsgGetFishEyeSoftChSelect: 113,
	SubMsgSetDelayTime: 114,
	SubMsgClearPlayFlag: 115,
	MainMsgOpenSafariByUrl: 116,
	SubMsg3DPosition: 117,
	SubMsgPlaybackNo: 118,
	SubMsgShowPlaybackTime: 119,
	SubMsgGetActivateKey: 120,
	SubMsgGetActivateFile: 121,
	SubMsgSendActivateFile: 122,
	MainMsgResolution: 123,
	SubMsgResolution: 124,
	MainMsgSimpleCmd: 125,
	SubMsgDownloadErrNo: 126,
	MainMsgValidate: 127,
	MainMsgGetCustomerInfo: 128,
	SubMsgGetDDNSArr: 129,
	SubMsgGetCInfoArr: 130,
	SubMsgUpdateAutoConn: 131,
	MainMsgImgToFull: 132,
	MainMsgLiveShowData: 133,
	SubMsgFrameRate: 134,
	SubMsgSoftPTZ: 135,

	SubMsgEmailTest: 301,
	SubMsgDDNSTest: 302,
	SubMsgRemoteReboot: 303,
	SubMsgFtpTest: 323,
	SubMsgHddFormat: 309,
	SubMsgAddAllDevice: 312, // A key to add message signaling function
	SubMsgActivateCloud: 321,
	SubMsgCloudCheck: 327, //c10 cloud check
	SubMsgRebootIPC: 329,
	SubMsgIPCLoadDefault: 330,
	MsgRemoteOneKeyAddIPC: 333,
	SubMsgZeroChnStatus: 336,
	SubMsgRemoteCheck: 337,
	SubMsgValidIPTest: 365,
	SubMsgDeleteLog: 367,
	SubMsgGetDDNSID: 403,
	SubMsgStopEmailTest: 412,
	SubMsgNewEmailTest: 413,
	MsgRoutePeat: 420,
	MsgRouteAdd: 421,
	MsgNewStreamset: 425,
	MsgIMPReq: 436,
	SubMsgSearchSmartCount: 710,
	SubMsgFishEyeWheelScroll: 711
};

var UserSetRightEnum = {
	Parameter: 0, //
	ManageDisk: 1, //
	RemoteLogin: 2, //
	Maintain: 3, //
	LogSearch: 4, //
	CuriseRight: 5, //
	SEQControl: 6, //
	ManualRecord: 7, //
	ManualCapture: 8, //
	AudioRight: 9, //
	UserRightMax: 10 //10
}
//RemoteChnStatusRpt.DevChnInfo.Abilities
//RsNetAlarmRpt.Abilities
//DevStatRpt.Abilities
var AbilityTypeEnum = {
	MAINSTREAM: 0,
	SUBSTREAM: 1,
	SNAPSTREAM: 2,
	OSD: 3,
	COLOR: 4,
	TIME: 5,
	COVER: 6,
	MOTIONSET: 7,
	/*motion Ability*/
	MOTIONAREA: 8,
	/*motion video*/
	IO: 9,
	/*The front-end equipment support IO report to the police*/
	PTZ: 10,
	IMAGE: 11,
	TIIPC: 12,
	NOSUPMAINSTREAMPARAM: 13,
	NOSUPSUBSTREAMPARAM: 14,
	NOSUPMOBILESTREAMPARAM: 15,
	INTELLIGENT: 16,
	IMAGE_IRIS: 17,
	H265: 18,
	FISHEYE: 19,
	BINOCULARS: 20,
	OSDTRANSPARENCY: 21, //OSD
	CORRIDOR_ANGLEROTATION: 22, //support corridor/angle rotation
	PIR: 23,
	SMART_MOTIION: 24,
	SUPPROT_WIREFREE: 25, //wireless//wireless channel preview can not AutoReconnect
	WHITE_LIGHT: 26,
	LOUD_SPEAKER: 27
};
var pageIndexEnum = {
	LIVE: 0,
	IO: 1,
	NETWORK: 2,
	HDD: 3,
	MOTION: 4,
	FLOODLIGHT: 5,
	FLOODLIGHTSCHEDULE: 6,
	SCHEDULE: 7,
	INFO: 8,
	DATEANDTIME: 9,
	WIRELESSCAMERA: 10,
	EMAILSETTING: 11,
	CLOUDSTORAGE: 12,
};
var controlBitEnum = {
	CTBIT0_E: 0, //lorex
	CTBIT1_E: 1, //1:support H264+, 265+, 0 :
	CTBIT2_E: 2,
	/*是否支持SD卡1:支持0:不支持*/
	CTBIT3_E: 3,
	/*是否支持Google home*/
	CTBIT4_E: 4,
	/*network 和 switch 页面合并 1:合并 0：不合并*/
	CTBIT5_E: 5,
	/*是否支持分两个时间段设置颜色值*/
	CTBIT6_E: 6,
	/*是否显示output参数页面*/
	CTBIT7_E: 7,
	/*是否支持修改IPC网络参数*/
	CTBIT8_E: 8,
	/*是否支持多通道设备IP的添加*/
	CTBIT9_E: 9,
	/*是否支持HTTPS 0:不支持 1：支持*/
	CTBIT10_E: 10,
	/*是否支持IR灯开关设置 0:不支持 1：支持*/
	CTBIT11_E: 11,
	/*是否支持IR时间设置 0:不支持 1：支持*/
	CTBIT12_E: 12,
	/* IRCUT MODE 是否取消显示GPIO AUTO 选项 ，0: 不取消显示; 1: 取消显示*/
	CTBIT13_E: 13,
	/*是否显示I帧间隔,0:显示，1：隐藏*/
	CTBIT14_E: 14,
	/*支持亚马逊IOT激活页面*/
	CTBIT15_E: 15,
	/*sound alarm显示标志位：0隐藏，1：显示*/
	CTBIT16_E: 16,
	/*ftp video显示标志位：0隐藏，1：显示*/
	CTBIT17_E: 17,
	/*是否支持手动录像类型的搜索*/
	CTBIT18_E: 18,
	/*是否隐藏 主码流页面,默认是显示,1:hide, 0:show*/
	CTBIT19_E: 19,
	/*是否隐藏 子码流页面,默认是显示,1:hide, 0:show*/
	CTBIT20_E: 20,
	/*是否隐藏 手机流页面,默认是显示,1:hide, 0:show*/
	CTBIT21_E: 21,
	/*抓图拓展显示标志位：0隐藏，1：显示*/
	CTBIT22_E: 22,
	/*IP Filter显示标志位：0隐藏，1：显示*/
	CTBIT23_E: 23,
	/* 是否支持模拟通道MJPEG码流 */
	CTBIT24_E: 24,
	/*FTP加密显示标志位：0隐藏，1：显示*/
	CTBIT25_E: 25,
	/*是否手机端支持http升级*/
	CTBIT26_E: 26,
	/*是否支持音频输入异常检测功能，0：隐藏，1：显示*/
	CTBIT27_E: 27,
	/*是否显示PTZ参数页面：0显示，1隐藏*/
	CTBIT28_E: 28,
	/* 是否支持客户端smart搜索, 0:不支持 1：支持 */
	CTBIT29_E: 29,
	/* 是否支持断网录像, 0:不支持 1：支持 */
	CTBIT30_E: 30,
	/* HDVR默认使用264录像格式，D31以上系列HDVR默认使用RF格式  0:264，1：RF*/
	CTBIT31_E: 31,
	/*FTP Video Upload和计划表功能,0:隐藏 1:显示*/
};

var controlBit2Enum = {
	CTBIT0_E: 0, 
	CTBIT1_E: 1,
	CTBIT2_E: 2,
	CTBIT3_E: 3,
	CTBIT4_E: 4,
	CTBIT5_E: 5,
	CTBIT6_E: 6,
	CTBIT7_E: 7,
	CTBIT8_E: 8,
	CTBIT9_E: 9,
	CTBIT10_E: 10,
	CTBIT11_E: 11,
	CTBIT12_E: 12,
	CTBIT13_E: 13,
	CTBIT14_E: 14,
	CTBIT15_E: 15,
	CTBIT16_E: 16,
	CTBIT17_E: 17,
	CTBIT18_E: 18,
	CTBIT19_E: 19,
	CTBIT20_E: 20,
	CTBIT21_E: 21,
	CTBIT22_E: 22,
	CTBIT23_E: 23,
	CTBIT24_E: 24,
	CTBIT25_E: 25,
	CTBIT26_E: 26,
	CTBIT27_E: 27,
	CTBIT28_E: 28,
	CTBIT29_E: 29,
	CTBIT30_E: 30,
	CTBIT31_E: 31,
};

var ControlBitArrayEnum = {
	CoBitAry_0:0,  //是否支持3合1功能 1:支持 0:不支持
	CoBitAry_1:1,  //是否显示wireless camera页面 1:显示 0:不显示
	CoBitAry_2:2,   //是否显示channel config页面 1:显示 0:不显示
	CoBitAry_3:3,
	CoBitAry_4:4,
	CoBitAry_5:5,
	CoBitAry_6:6,
	CoBitAry_7:7,
	CoBitAry_8:8,
};
var queryTypeEnum = {
	QUERY_ALL: 1000,
	QUERY_ALL2: 1100,
	QUERY_ALL_DEFAULT: 1200,
	GET_ALL: 1300,
	SAVE_ALL: 2000,
	MODIFY_PSW: 800,
	QUERY_ALL_WITHDATA: 900,
	QUERY_PARAM_INDEX: 950,
};