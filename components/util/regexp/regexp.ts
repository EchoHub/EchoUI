
/**
 * @desc 解析正则字符串
 * @param 要解析的字符串
 * @return 返回一个新的正则对象
 */
export function param(value) {
    // 正则表达式标志（gium）
    let flags = ""
    if(/(\/|\/(g|i|u|m|y)+)$/g.test(value)) {
        flags = value.split("/")[value.split("/").length - 1]
    }
    return new RegExp(value.replace(/^\/|(\/|\/(g|i|u|m|y)+)$/g, ""), flags)
}