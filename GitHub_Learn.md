## 编辑文件，不上传 某些文件/文件夹：
文件名： .gitignore
文件内容：

```
don_not_upload/   
#忽略文件夹下的所有文件

don_not_upload2/test.txt
#忽略具体某个文件

!neccessary_file.txt
# 不忽略 文件


/root_path
# 仅仅忽略项目根目录下的 root_path文件夹，不包括 test/root_path

*.myFile
# 忽略所有 .myFile 结尾的文件


test_path/*.myFile
# 忽略 test_path/下的 myFile 结尾的文件，但是不包括其他文件夹下的 myFile结尾文件。

```