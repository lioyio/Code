/*
 * 参数页面控制相关
 */
function config() {
    if ((!(vm.gDevice.isUI5_0() || vm.gDevice.isUI5_2()) &&
            vm.gDevice.isDevType(devTypeEnum.DEV_NVR) &&
            !vm.gVar.Customer(0) &&
            !vm.gVar.Customer(3)) ||
        ((vm.gDevice.isUI5_0() || vm.gDevice.isUI5_2()) && vm.gDevice.GetControlBitArray(ControlBitArrayEnum.CoBitAry_8))) {
        vm.gVar.isTriggerAlarmOut = true;
    }
}