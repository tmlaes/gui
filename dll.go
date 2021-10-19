package main

import (
	"fmt"
	"io"
	"os"
)

func LoadDll()  {
	//先判断当前系统是否是64位系统
	//bit := 32 << (^uint(0) >> 63)
	flag,err := PathExists("C:\\Windows\\System32\\sciter.dll")
	if err!= nil {
		fmt.Println(err)
	}
	//如果不存在
	if !flag {
		copyFlag , err2 := CopyFile("sciter.dll","C:\\Windows\\System32\\sciter.dll")

		if err2 != nil {
			fmt.Println(err2)
		}

		fmt.Println(copyFlag)
	}
}
//复制文件  需要考虑权限问题
func CopyFile(src, des string) (w int64, err error) {
	srcFile, err := os.Open(src)
	if err != nil {
		fmt.Println(err)
	}
	defer srcFile.Close()

	desFile, err := os.Create(des)
	if err != nil {
		fmt.Println(err)
	}
	defer desFile.Close()

	return io.Copy(desFile, srcFile)
}
//文件是否存在
func PathExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}