package com.github.smallbug.structure.sort;

/**
 * 快速排序
 * <ul>
 * <li>平均情况：O(nlog(2)n)</li>
 * <li>最好情况：O(nlog(2)n)</li>
 * <li>最坏情况：O(N^2)</li>
 * <li>辅助存储：O(nlog(2)n)</li>
 * <li>不稳定</li>
 * <ul>
 * 
 * @timestamp Mar 11, 2016 10:43:10 PM
 * @author smallbug
 */
public class QuickSort {

	public static void main(String[] args) {
		int[] data = DataUtil.getData(10000000);
//		System.out.println(Arrays.toString(data));
		long time = System.currentTimeMillis();
		quickSort(data);
//		System.out.println(Arrays.toString(data));
		System.out.println("speed " + (System.currentTimeMillis() - time) + " ms");
		System.out.println("排序是否成功：" + (DataUtil.verify(data, DataUtil.ASC) ? "是" : "否"));
	}

	private static void quickSort(int[] data) {
		quick_sort_recursive(data, 0, data.length - 1);
	}

	private static void quick_sort_recursive(int[] arr, int start, int end) {
		if (start >= end)
			return;

		int mid = arr[end];
		int left = start;
		int right = end - 1;

		while (left < right) {
			while (arr[left] < mid && left < right)
				left++;
			while (arr[right] >= mid && left < right)
				right--;
			DataUtil.swap(arr, left, right);
		}

		if (arr[left] >= arr[end])
			DataUtil.swap(arr, left, end);
		else
			left++;

		quick_sort_recursive(arr, start, left - 1);
		quick_sort_recursive(arr, left + 1, end);
	}

}
