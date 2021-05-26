/**
 * palyground 基础数据类型
 */

// 声明一个函数
declare function create(o: object | null): void;
// right
create({prop: 0})
create(null)
// error
create(123)
create('string')
create(false)
create(undefined)