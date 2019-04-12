/*
 * 参数页面控制相关
 */
function config() {
    if ((!(gDevice.isUI5_0() || gDevice.isUI5_2()) &&
            gDevice.isDevType(devTypeEnum.DEV_NVR) &&
            !gVar.Customer(0) &&
            !gVar.Customer(3)) ||
        ((gDevice.isUI5_0() || gDevice.isUI5_2()) && gDevice.GetControlBitArray(ControlBitArrayEnum.CoBitAry_8))) {
        gVar.isTriggerAlarmOut = true;
    }
}