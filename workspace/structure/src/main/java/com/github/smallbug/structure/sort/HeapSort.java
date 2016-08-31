package com.github.smallbug.structure.sort;

import java.util.Arrays;

/**
 * 
 * <ul>
 * <li>平均情况：O(nlog(2)n)</li>
 * <li>最好情况：O(nlog(2)n)</li>
 * <li>最坏情况：O(nlog(2)n)</li>
 * <li>辅助存储：O(1)</li>
 * <li>不稳定</li>
 * <ul>
 *
 * @timestamp Mar 12, 2016 6:56:54 PM
 * @author smallbug
 */

public class HeapSort {
	public static void main(String[] args) {
		int[] data = DataUtil.getData(50);
		System.out.println(Arrays.toString(data));
		long time = System.currentTimeMillis();
		heapSort(data);
		System.out.println(Arrays.toString(data));
		System.out.println("speed " + (System.currentTimeMillis() - time) + " ms");
		System.out.println("排序是否成功：" + (DataUtil.verify(data, DataUtil.ASC) ? "是" : "否"));
	}

	private static void heapSort(int[] data) {
		createHeap(data);
		heapSortDetail(data);
	}

	private static void heapSortDetail(int[] data) {
		// 末尾与头交换，交换后调整最大堆
		for (int i = data.length - 1; i > 0; i--) {
			int temp = data[0];
			data[0] = data[i];
			data[i] = temp;
			maxHeapify(data, i, index2Cood(0));
		}
	}

	private static void createHeap(int[] data) {
		int startIndex = getParentIndex(data.length);
		for (int i = startIndex; i >= 0; i--) {
			maxHeapify(data, data.length, index2Cood(i));
		}
	}

	private static void maxHeapify(int[] data, int heapSize, int cood) {
		// 当前点与左右子节点比较
		int leftIndex = getChildLeftIndex(cood);
		int rightIndex = getChildRightIndex(cood);

		int largest = cood;
		if (leftIndex < heapSize && data[cood2Index(cood)] < data[leftIndex]) {
			largest = index2Cood(leftIndex);
		}
		if (rightIndex < heapSize && data[cood2Index(largest)] < data[rightIndex]) {
			largest = index2Cood(rightIndex);
		}
		// 得到最大值后可能需要交换，如果交换了，其子节点可能就不是最大堆了，需要重新调整
		if (largest != cood) {
			int temp = data[cood2Index(cood)];
			data[cood2Index(cood)] = data[cood2Index(largest)];
			data[cood2Index(largest)] = temp;
			maxHeapify(data, heapSize, largest);
		}
	}

	/**
	 * 索引转坐标
	 * 
	 * @timestamp 2016年8月23日 上午11:12:01
	 * @param index
	 * @return
	 */
	private static int index2Cood(int index) {
		return index + 1;
	}

	/**
	 * 坐标转索引
	 * 
	 * @timestamp 2016年8月23日 上午11:11:51
	 * @param cood
	 * @return
	 */
	private static int cood2Index(int cood) {
		return cood - 1;
	}

	/**
	 * 根据子元素坐标获取父元素索引
	 * 
	 * @timestamp 2016年8月23日 上午11:30:27
	 * @param cood
	 * @return
	 */
	private static int getParentIndex(int cood) {
		return cood2Index(cood >>> 1);
	}

	/**
	 * 左子节点position注意括号，加法优先级更高
	 * 
	 * @param current
	 * @return
	 */
	private static int getChildLeftIndex(int cool) {
		return cood2Index(cool << 1);
	}

	/**
	 * 右子节点position
	 * 
	 * @param current
	 * @return
	 */
	private static int getChildRightIndex(int cool) {
		return cood2Index(cool << 1) + 1;
	}
}
