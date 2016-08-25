#include<stdio.h>  
#include<stdlib.h>  
#include<unistd.h>  
#include<semaphore.h>  
#include<pthread.h>

#define msleep(x)   usleep(x*1000)  
#define PRODUCT_SPEED       3               //生产速度  
#define CONSUM_SPEED        1               //消费速度  
#define TOTAL_NUM           10 
#define INIT_NUM           3

sem_t p_sem, c1_sem, c2_sem, sh_sem;  
int cache1[5];   // 一号缓存
int cache2[5];   // 二号缓存

void product(void)                          //生产产品  
{  
    sleep(PRODUCT_SPEED);  
}  
   
void add_to_lib()                                //添加产品到仓库  
{  
    int f[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    int i;
    printf("生产者放入缓存：\n"); 
    for(i=0; i < 5; i++)
    {
        cache1[i] = f[i];
    }
    i = 0;
    for(i=5; i < 10; i++)
    {
        cache2[i-5] = f[i];
    }
    for(i=0; i < 10; i++)
    {
        printf("%d ", f[i]);
    }
    printf("\n"); 
    msleep(500);  
}  
   
void consum()                                       //消费  
{  
    sleep(CONSUM_SPEED);  
}  
   
int sub_from_lib()                          //从仓库中取出产品  
{  
  //  num--; //仓库中的产品数量减一  
    msleep(500);  
    return 0;  
}  
   
void *productor(void *arg)          //生产者线程  
{  
    while(1)  
    {  
        sem_wait(&p_sem);//生产信号量减一  
        product();// 生产延时         
        sem_wait(&sh_sem);//这个信号量是用来互斥的  
        add_to_lib();
        sem_post(&sh_sem);    
        sem_post(&c1_sem);  //消费信号量加一  
        sem_post(&c2_sem);  //消费信号量加一  
    }  
}  
   
void *consumer1(void *arg)               //消费者线程  
{  
    while(1)  
    {  
           
        sem_wait(&c1_sem); //消费者信号量减一      
        sem_wait(&sh_sem);  
        sem_post(&sh_sem);        
        sem_post(&p_sem);//生产者信号量加一   
        consum();//消费延时  
        
        printf("消费者一从缓存中取数据：\n"); 
        int i;
        for(i=0; i < 5; i++)
        {
            printf("%d ", cache1[i]);
        }
        printf("\n");
    }  
}  

void *consumer2(void *arg)               //消费者线程  
{  
    while(1)  
    {  
           
        sem_wait(&c2_sem); //消费者信号量减一      
        sem_wait(&sh_sem);  
        sem_post(&sh_sem);        
        sem_post(&p_sem);//生产者信号量加一   
        consum();//消费延时  
        printf("消费者二从缓存中取数据：\n"); 
        int i;
        for(i=0; i < 5; i++)
        {
            printf("%d ", cache2[i]);
        }
        printf("\n");
    }  
}  

int main()  
{  
    pthread_t tid1,tid2,tid3;  
    sem_init(&p_sem,0,TOTAL_NUM-INIT_NUM);  
       
    sem_init(&c1_sem,0,INIT_NUM);  
    sem_init(&c2_sem,0,INIT_NUM);  
       
    sem_init(&sh_sem,0,1);  
       
    pthread_create(&tid1,NULL,productor,NULL);  
    pthread_create(&tid2,NULL,consumer1,NULL);  
    pthread_create(&tid3,NULL,consumer2,NULL); 
       
    pthread_join(tid1,NULL);  
    pthread_join(tid2,NULL);  
    pthread_join(tid3,NULL);  
    return 0;  
} 

/*

设计一程序，由一个进程创建三个子线程，
三个子线程一个是生产者线程，
两个是消费者线程，
父子线程都使用父进程创建的共享存储区进行通信，
由生产者进程将一个数组中的十个数值发送到由5个缓冲区组成的共享内存中，
两个消费者进程轮流接收并输出这十个数值，
同时将两个消费者进程读出的数值进行累加求各和

*/