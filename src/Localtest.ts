import { AccountUpdate, Mina, PrivateKey } from 'snarkyjs';
import { SmartContractMul, Matrix1, Matrix2 } from './SmartContractMul.js';

// to run tests faster
const proofsEnabled = false;

const Local = Mina.LocalBlockchain({ proofsEnabled });
Mina.setActiveInstance(Local);
let deployerAccount = Local.testAccounts[0].privateKey;
let zkAppPrivateKey = PrivateKey.random();
let zkAppAddress = zkAppPrivateKey.toPublicKey();
let zkApp = new SmartContractMul(zkAppAddress);
await SmartContractMul.compile();

// We deploy the smart contract locally
async function localDeploy() {
  const txn = await Mina.transaction(deployerAccount, () => {
    AccountUpdate.fundNewAccount(deployerAccount);
    zkApp.deploy();
  });
  await txn.prove();
  // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
  await txn.sign([zkAppPrivateKey]).send();
}
// ------------------- These work -------------------
// change the MATRIX_LENGTH to 3
// let matrix1 = new Matrix1([
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ]);
// let matrix2 = new Matrix2([
//   [-1, -2, -3],
//   [1, 2, 3],
//   [-1, -2, -3],
// ]);

// Matrix 10x10
// change the MATRIX_LENGTH to 10
// let matrix1 = new Matrix1([
//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [2, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [3, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [4, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [5, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [6, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [7, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [8, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [9, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [10, 2, 3, 4, 5, 6, 7, 8, 9, 10],
// ]);
// let matrix2 = new Matrix2([
//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [2, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [3, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [4, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [5, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [6, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [7, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [8, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [9, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [10, 2, 3, 4, 5, 6, 7, 8, 9, 10],
// ]);

// ------------------- These don't work -------------------
// 20x20 matrix
// CHANGE MATRIX_LENGTH to 20 !!!!!!!!!!
let matrix1 = new Matrix1([
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [3, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [4, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [6, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [7, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [8, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [9, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [10, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [12, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [13, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [15, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [16, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [17, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [18, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [19, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [20, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
]);

// // 20x20 matrix
let matrix2 = new Matrix2([
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [3, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [4, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [6, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [7, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [8, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [9, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [10, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [12, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [13, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [15, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [16, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [17, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [18, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [19, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [20, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
]);

// console.log('matrix3x3', matrix3x3.value);
// console.log('matrix3x9', matrix3x9.value);
// console.log('matrix3x3[0]', matrix3x3.value[0]);
// console.log('matrix3x3[0][0]', matrix3x3.value[0][0].magnitude);
// console.log('matrix3x3[0][0].magnitude', matrix3x3.value[0][0].magnitude.value);

// console.log('matrix3x9[0]', matrix3x9.value[1]);
// console.log('matrix3x9[0][0]', matrix3x9.value[1][0].magnitude);
// console.log('matrix3x9[0][0].magnitude', matrix3x9.value[1][0].magnitude.value);

// console.log('matrix3x9[0]', matrix3x9.value[1]);
// console.log('matrix3x9[1][1]', matrix3x9.value[1][1].magnitude);
// console.log('matrix3x9[1][1].magnitude', matrix3x9.value[1][1].magnitude.value);

console.log('matrix1', JSON.stringify(matrix1));

console.log(
  '----------------------------------- deploying -----------------------------------'
);
await localDeploy();
const num = zkApp.num.get();
console.log('num', num);
console.log(
  '----------------------------------- deployed -----------------------------------'
);
console.log(
  '----------------------------------- creating transaction -----------------------------------'
);
const txn = await Mina.transaction(deployerAccount, () => {
  let y = zkApp.dot_product_t2(matrix1, matrix2);
  console.log('y', JSON.stringify(y));
});
console.log(
  '----------------------------------- proofing transaction -----------------------------------'
);
await txn.prove();
/* Sending a transaction to the blockchain. */
console.log(
  '----------------------------------- sending transaction -----------------------------------'
);
await txn.send();
console.log(
  '----------------------------------- transaction send -----------------------------------'
);

const updatedNum = zkApp.num.get();
console.log('updatedNum', updatedNum);
