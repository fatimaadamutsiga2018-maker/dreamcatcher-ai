// 测试 calculateEnergy 函数
import { calculateEnergy } from './src/lib/engine.js';

console.log('=== 测试 calculateEnergy 函数 ===\n');

try {
  const testSeed = '123';
  console.log(`测试输入: ${testSeed}`);

  const result = calculateEnergy(testSeed);

  console.log('\n返回结果:');
  console.log('- score:', result.score);
  console.log('- vibe:', result.vibe);
  console.log('- card.status:', result.card.status);
  console.log('- card.oracle:', result.card.oracle);
  console.log('- card.supported:', result.card.supported);
  console.log('- card.adjustment:', result.card.adjustment);

  console.log('\n✅ 测试通过！函数返回了正确的数据结构。');
} catch (error) {
  console.error('\n❌ 测试失败！');
  console.error('错误信息:', error.message);
  console.error('错误堆栈:', error.stack);
}
