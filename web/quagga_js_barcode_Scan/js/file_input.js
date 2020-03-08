function decode(img_url) {
            var config = {
                readers: ["code_128_reader"],
                locate: true,
                src : img_url
            }
            Quagga.decodeSingle(config, function (result) {
                console.log("decoding...");
                if (!result) {
                    console.log("图片中没有条形码！");
                    return false;
                }
                //识别结果
                if (result.codeResult) {
                    console.log("图片中的条形码为：" + result.codeResult.code);
                } else {
                    console.log("未识别到图片中的条形码！");
                }
            });
        }