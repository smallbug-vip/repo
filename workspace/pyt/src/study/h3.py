'''
Created on 2016年10月17日

@author: i-jiashuomeng
'''

from PIL import Image


''' 生成缩略图 '''

def opimg():
    im = Image.open('test.png')
    print(im.format, im.size, im.mode)
    im.thumbnail((200, 100))
    im.save('thumb.jpg', 'JPEG')


''' 入口方法 '''
    
if __name__ == '__main__':
    
    pass