package main

import (
	"github.com/wj008/go-sciter"
	"github.com/wj008/go-sciter/window"
	"log"
	"path/filepath"
	"syscall"
)

var (
	SCREEN_WIDTH  int32
	SCREEN_HEIGHT int32
)

func main() {
	//GenerateRice()
	createMainWindow()
}

func createMainWindow() {
	screenSize()
	LoadDll()
	//创建window窗口
	//参数一表示创建窗口的样式
	//SW_TITLEBAR 顶层窗口，有标题栏
	//SW_RESIZEABLE 可调整大小
	//SW_CONTROLS 有最小/最大按钮
	//SW_MAIN 应用程序主窗口，关闭后其他所有窗口也会关闭
	//SW_ENABLE_DEBUG 可以调试
	//参数二表示创建窗口的矩形
	w, err := window.New(sciter.DefaultWindowCreateFlag,
		//给窗口设置个大小
		&sciter.Rect{Left: 320, Top: 130, Right: SCREEN_WIDTH - 300, Bottom: SCREEN_HEIGHT - 200})
	if err != nil {
		log.Fatal(err)
	}

	//通过sciter-rice来处理和加载资源
	//HandleDataLoad(w.Sciter)
	//通过sciter-rice封装的路径调用文件
	//w.LoadFile("rice://template/index.html")
	//pwd, _ := os.Getwd()
	fullpath, err := filepath.Abs("template/index.html")
	if err != nil {
		log.Fatal(err)
	}
	w.LoadFile(fullpath)
	//设置标题
	//w.SetTitle("表单")
	//显示窗口
	w.Show()
	//运行窗口，进入消息循环
	w.Run()
}

func screenSize() {
	user32 := syscall.NewLazyDLL("User32.dll")
	getSystemMetrics := user32.NewProc("GetSystemMetrics")
	width, _, _ := getSystemMetrics.Call(0)
	height, _, _ := getSystemMetrics.Call(1)
	SCREEN_WIDTH = int32(width)
	SCREEN_HEIGHT = int32(height)
}
