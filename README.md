在根目录下建立app.rc文件，内容如下：
IDI_ICON1 ICON "App.ico"

然后通过MinGW的windres生成app.syso(控制台执行)
windres -o app.syso app.rc
打包后自动生成图标
go build -ldflags="-H windowsgui"



打包html到exe
1.第一步：main方法
import (
tool "github.com/GeertJohan/go.rice"
)
func Grice() {
tool.MustFindBox("template")
}
第二步：
rice -i "F:\goproject\src\gui" embed-go

第三步：
//通过sciter-rice来处理和加载资源
rice.HandleDataLoad(w.Sciter)
//通过sciter-rice封装的路径调用文件
w.LoadFile("rice://template/index.html")





//图片转base64
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0 DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==">

	