package cn.smallbug.mongodb;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.exists;
import static com.mongodb.client.model.Filters.gt;
import static com.mongodb.client.model.Filters.gte;
import static com.mongodb.client.model.Filters.lt;
import static com.mongodb.client.model.Filters.lte;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.include;
import static com.mongodb.client.model.Sorts.descending;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

/**
 * Mondodb Driver 3.0测试
 * 
 * @timestamp Feb 12, 2016 11:12:31 AM
 * @author smallbug
 */
public class TestDriver {
	MongoDatabase db = null;
	MongoClient client = null;

	@Before
	public void before() {
		client = new MongoClient("192.168.88.132", 27017);
		db = client.getDatabase("its");
	}

	@After
	public void after() {
		if (client != null) {
			client.close();
		}
	}

	/**
	 * 获取连接
	 * 
	 * @timestamp Feb 12, 2016 11:36:05 AM
	 */
	@Test
	public void testCollections() {

		MongoIterable<String> collections = db.listCollectionNames();
		MongoCursor<String> cu = collections.iterator();
		for (; cu.hasNext();) {
			System.out.println(cu.next());
		}
	}

	/**
	 * 测试增加一个Document
	 * 
	 * @timestamp Feb 12, 2016 11:39:20 AM
	 */
	@Test
	public void testAdd() {
		MongoCollection<Document> col = db.getCollection("s1");
		Document doc = new Document("name", "MongoDB")//
				.append("type", "database")//
				.append("count", 1)//
				.append("info", new Document("x", 203).append("y", 102));
		col.insertOne(doc);
	}

	/**
	 * 测试增加多个Document
	 * 
	 * @timestamp Feb 12, 2016 11:39:20 AM
	 */
	@Test
	public void testAddALL() {
		MongoCollection<Document> col = db.getCollection("s1");
		List<Document> dos = new ArrayList<Document>();
		for (int i = 0; i < 100; i++) {
			dos.add(new Document("i", i));
		}
		col.insertMany(dos);
	}

	/**
	 * 查看当前有多少记录
	 * 
	 * @timestamp Feb 12, 2016 12:59:18 PM
	 */
	@Test
	public void testCount() {
		MongoCollection<Document> col = db.getCollection("s1");
		System.out.println(col.count());
	}

	/**
	 * 获取第一条记录
	 * 
	 * @timestamp Feb 12, 2016 1:00:58 PM
	 */
	@Test
	public void testFirst() {
		MongoCollection<Document> col = db.getCollection("s1");
		Document myDoc = col.find().first();
		System.out.println(myDoc.toJson());
	}

	/**
	 * 获取第所有记录
	 * 
	 * @timestamp Feb 12, 2016 1:00:58 PM
	 */
	@Test
	public void testFindAll() {
		MongoCollection<Document> col = db.getCollection("s1");
		/**************** 第一种方法 *********************/
		// MongoCursor<Document> cursor = col.find().iterator();
		// while (cursor.hasNext()) {
		// System.out.println(cursor.next().toJson());
		// }
		/**************** 第二种方法 *********************/
		for (Document cur : col.find()) {
			System.out.println(cur.toJson());
		}
	}

	/**
	 * 分页
	 * 
	 * @timestamp Feb 12, 2016 2:17:42 PM
	 */
	@Test
	public void testLimit() {
		MongoCollection<Document> col = db.getCollection("s1");
		for (Document cur : col.find().skip(20).limit(10)) {
			System.out.println(cur.toJson());
		}
	}

	/**
	 * 条件查询
	 * 
	 * @timestamp Feb 12, 2016 1:06:20 PM
	 */
	@Test
	public void testFilter() {
		MongoCollection<Document> col = db.getCollection("s1");
		// eq为静态导入
		Document myDoc = col.find(eq("i", 71)).first();
		System.out.println(myDoc.toJson());
	}

	/**
	 * 获得子集
	 * 
	 * @timestamp Feb 12, 2016 1:23:33 PM
	 */
	@Test
	public void testBlock() {
		MongoCollection<Document> col = db.getCollection("s1");
		Block<Document> printBlock = new Block<Document>() {
			@Override
			public void apply(final Document document) {
				System.out.println(document.toJson());
			}
		};
		col.find(and(gt("i", 50), lte("i", 80))).forEach(printBlock);
	}

	/**
	 * 排序
	 * 
	 * @timestamp Feb 12, 2016 1:27:45 PM
	 */
	@Test
	public void testSort() {
		MongoCollection<Document> col = db.getCollection("s1");
		// 升序 ascending
		FindIterable<Document> it = col.find(exists("i")).sort(descending("i"));
		for (Document d : it) {
			System.out.println(d.toJson());
		}
	}

	/**
	 * 筛选字段
	 * 
	 * @timestamp Feb 12, 2016 1:45:09 PM
	 */
	@Test
	public void testProjection() {
		MongoCollection<Document> col = db.getCollection("s1");
		FindIterable<Document> it = col.find()//
				.projection(and(include("name"), excludeId()));
		for (Document d : it) {
			System.out.println(d.toJson());
		}
	}

	/**
	 * 更新一条Document
	 * 
	 * @timestamp Feb 12, 2016 1:47:46 PM
	 */
	@Test
	public void testUpdateOne() {
		MongoCollection<Document> col = db.getCollection("s1");
		col.updateOne(//
				eq("i", 10), new Document("$set", new Document("i", 110)));
	}

	/**
	 * 更新多条记录
	 * 
	 * @timestamp Feb 12, 2016 1:49:25 PM
	 */
	@Test
	public void testUpdateMany() {
		MongoCollection<Document> col = db.getCollection("s1");
		// $inc 自增
		UpdateResult updateResult = col.updateMany(lt("i", 10), new Document("$inc", new Document("i", 234)));
		System.out.println(updateResult.getModifiedCount());
	}

	/**
	 * 测试删除一条Document
	 * 
	 * @timestamp Feb 12, 2016 1:54:58 PM
	 */
	@Test
	public void testDeleteOne() {
		MongoCollection<Document> col = db.getCollection("s1");
		DeleteResult re = col.deleteOne(eq("i", 234));
		System.out.println(re.getDeletedCount());
	}

	/**
	 * 测试删除多条Document
	 * 
	 * @timestamp Feb 12, 2016 1:59:06 PM
	 */
	@Test
	public void testDeleteMany() {
		MongoCollection<Document> col = db.getCollection("s1");
		DeleteResult deleteResult = col.deleteMany(gte("i", 100));
		System.out.println(deleteResult.getDeletedCount());
	}
}
