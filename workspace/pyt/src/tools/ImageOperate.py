'''
Created on 2016年11月3日

@author: smallbug
'''

'''
    pip install Pillow
'''

from PIL import Image

def thumbnail():
    fileName = input("please input image all name: ")
    im = Image.open(fileName)
    print("image info:[", "imege format:", im.format, ", image size:", im.size, ", image mode:", im.mode, "]")
    
    size = input("please input size: ")
    if ',' not in size:
        f = float(size)
        if f>1:
            raise TypeError("number must less than 1!")
        strArr = map(lambda x:x * f, im.size)
    else:
        strArr = size.split(",")
        strArr = map(lambda x:int(x), strArr)

    im.thumbnail(tuple(strArr))
    target = input("please input target: ")
    if(len(target) == 0):
        im.save('thumb.jpg', 'JPEG')
    else:
        im.save(target + '.jpg', 'JPEG')

