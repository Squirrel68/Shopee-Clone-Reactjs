// async callback
setTimeout(() => {
  console.log("Async callback: Hello");
}, 1000);
console.log("Async callback: Duy Nghia Dev");

// promise
const promiseFunc = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello Promise");
    }, 0);
  });

const value = promiseFunc()
  .then((value) => {
    console.log(value);
    return 100;
  })
  .catch((error) => {
    console.log(error);
    return -100;
  })
  .finally(() => {
    console.log("Ket thuc roi");
  });

value.then((value) => {
  console.log(value);
});
console.log("value:", value);

/**
 * async await 🚀
 * - await chỉ sử dụng được trong một async function ✅
 * - async await chỉ có tác dụng với promise thôi nha ✅
 * - Chỉ sử dụng await với promise ✅
 *
 * - Trong ví dụ dưới chúng ta có p2() là promise. Lưu ý là chúng chỉ sử dụng await với promise (đó chính là p2)
 * - Chúng ta phải gọi function p2() ra, thì đó mới là promise
 * - Chứ còn p2 như này (không có dấu ngoặc tròn) thì nó chỉ là function thôi. Nó không có tác dụng ❌
 */
const p2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello Async Await");
    }, 0);
  });

const handle = async () => {
  try {
    const value = await p2();
    console.log("Async Await: ", value);
  } catch (error) {
    console.warn(error);
  } finally {
    console.log("Async Await Finally");
  }
};
handle();

/**
 * - Bonus: nếu chúng ta muốn sử dụng async await mà không muốn khai báo hàm, thì chúng ta có thể khai
 * báo hàm ẩn danh
 *
 * - Khi gọi hàm ẩn danh thì lưu ý mấy bạn phải có dấu chấm phẩy (;) ở phía trước nha. Để tránh cái trường
 * hợp lỗi không đáng có ❌
 */
const p3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Bonus async await");
    }, 0);
  });

(async () => {
  try {
    const value = await p3();
    console.log(value);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Finally bonus async await");
  }
})();
