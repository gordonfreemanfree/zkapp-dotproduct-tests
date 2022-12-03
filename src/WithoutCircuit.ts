// Description
// With this file I'm trying to do a dot product on two rank 2 tensors of type Int64.
// this is run outside of circuit. and it works fine.
// I'm trying to do the same thing inside of circuit, but I'm getting an error.
import { isReady, matrixProp, Int64 } from 'snarkyjs';
await isReady;

const MATRIX_LENGTH = 20;

// creating a class for the matrix in order to get fixed size
// if working with different size, you need to change the size of the matrix and the for loop in the dot product and the transpose function
export class Matrix1 {
  @matrixProp(Int64, MATRIX_LENGTH, MATRIX_LENGTH) value: Int64[][];

  constructor(matrix: number[][]) {
    this.value = this.num2Int64_t2(matrix);
  }

  num2Int64_t2(x: Array<number>[]): Array<Int64>[] {
    let y = Array();
    x.forEach((value, index) => (y[index] = this.num2Int64_t1(value)));
    return y;
  }

  num2Int64_t1(x: Array<number>): Array<Int64> {
    let y = Array();
    x.forEach((value, index) => (y[index] = this.num2Int64(value)));
    return y;
  }
  num2Int64(x: number): Int64 {
    return Int64.from(x);
    // commenting this scale factor out for now
    // return Int64.from(Math.floor(x * this.scale_factor));
  }
}

export class Matrix2 {
  @matrixProp(Int64, MATRIX_LENGTH, MATRIX_LENGTH) value: Int64[][];

  constructor(matrix: number[][]) {
    this.value = this.num2Int64_t2(matrix);
  }

  num2Int64_t2(x: Array<number>[]): Array<Int64>[] {
    let y = Array();
    x.forEach((value, index) => (y[index] = this.num2Int64_t1(value)));
    return y;
  }

  num2Int64_t1(x: Array<number>): Array<Int64> {
    let y = Array();
    x.forEach((value, index) => (y[index] = this.num2Int64(value)));
    return y;
  }
  num2Int64(x: number): Int64 {
    return Int64.from(x);
    // commenting this scale factor out for now
    // return Int64.from(Math.floor(x * this.scale_factor));
  }
}

export class SmartContractMul {
  // just a check to see if the dot product is working correctly because we update the state after the dot product

  // method for matrix multiplication
  dot_product_t2(m1: Matrix1, m2: Matrix2): Int64[][] {
    console.log('in the dot product');
    // Perform a dot product on the two rank 2 tensors
    let y: Array<Int64>[] = Array();
    // m1 = this.transpose(m1.value);
    let m2_t = this.transpose(m2.value);
    // let m2_t = m2.value;
    for (let i = 0; i < MATRIX_LENGTH; i++) {
      // console.log('in the first for loop -----------------', i);
      let m_array = Array<Int64>();
      for (let j = 0; j < MATRIX_LENGTH; j++) {
        // console.log('in the second for loop', j);
        m_array[j] = this.dot_product_t1(m1.value[i], m2_t[j]);
      }
      y[i] = m_array;
    }

    return y;
    // let num = this.num.get();
    // this.num.assertEquals(num);
    // this.num.set(Field(10).add(y[0].value));
    // console.log('y', y);
    // console.log('y[0]', y[0]);
    // console.log('y[0][0]', y[0][0]);
    // console.log('y[0][0]', y[0][0]);
    // console.log('y[0][0].magnitude', y[0][0].magnitude);
    // console.log('y[0][0].magnitude.value', y[0][0].magnitude.value);
    // console.log('y[0][1].magnitude.value', y[0][1].magnitude.value);
    // console.log('y[0][2].magnitude.value', y[0][2].magnitude.value);
    // console.log('y[0][3].magnitude.value', y[0][3].magnitude.value);
    // console.log('y[0][4].magnitude.value', y[0][4].magnitude.value);
    // console.log('y[0][5].magnitude.value', y[0][5].magnitude.value);
    // console.log('y[0][6].magnitude.value', y[0][6].magnitude.value);
  }

  // Description:   Perform a dot product for two rank 1 tensors of type Int64
  // Input:         m1 - Rank 1 Tensor of type Int64
  //                m2 - Rank 1 Tensor of type Int64
  // Output:        y - Dot product Rank 0 Tensor of type Int64
  private dot_product_t1(v1: Array<Int64>, v2: Array<Int64>): Int64 {
    console.log('in the dot product t1');
    let y = Int64.zero;
    console.assert(
      v1.length === v2.length,
      "tensor dimensions do not fit, can't do dot_product_t1"
    );
    v1.forEach((v1_value, i) => (y = y.add(v1_value.mul(v2[i]).div(1))));
    return y;
  }

  // Description:   Transpose a rank 2 tensor of type Int64
  // Input:         x - Rank 2 Tensor of type Int64
  // Output:        y - Transposed Rank 2 Tensor of type Int64 of x
  private transpose(x: Array<Int64>[]): Array<Int64>[] {
    // Transpose the rank 2 tensor
    console.log('in the transpose');
    let y = Array();
    for (let i = 0; i < MATRIX_LENGTH; i++) {
      let m_array = Array();
      for (let j = 0; j < MATRIX_LENGTH; j++) {
        m_array[j] = x[j][i];
      }
      y[i] = m_array;
    }
    return y;
  }
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

// Solution 20x20
// let solution = [
//   [
//     2870,
//     420,
//     630,
//     840,
//     1050,
//     1260,
//     1470,
//     1680,
//     1890,
//     2100,
//     2310,
//     2520,
//     2730,
//     2940,
//     3150,
//     3360,
//     3570,
//     3780,
//     3990,
//     4200,
//   ],
//   [
//     2871,
//     422,
//     633,
//     844,
//     1055,
//     1266,
//     1477,
//     1688,
//     1899,
//     2110,
//     2321,
//     2532,
//     2743,
//     2954,
//     3165,
//     3376,
//     3587,
//     3798,
//     4009,
//     4220,
//   ],
//   [
//     2872,
//     424,
//     636,
//     848,
//     1060,
//     1272,
//     1484,
//     1696,
//     1908,
//     2120,
//     2332,
//     2544,
//     2756,
//     2968,
//     3180,
//     3392,
//     3604,
//     3816,
//     4028,
//     4240,
//   ],
//   [
//     2873,
//     426,
//     639,
//     852,
//     1065,
//     1278,
//     1491,
//     1704,
//     1917,
//     2130,
//     2343,
//     2556,
//     2769,
//     2982,
//     3195,
//     3408,
//     3621,
//     3834,
//     4047,
//     4260,
//   ],
//   [
//     2874,
//     428,
//     642,
//     856,
//     1070,
//     1284,
//     1498,
//     1712,
//     1926,
//     2140,
//     2354,
//     2568,
//     2782,
//     2996,
//     3210,
//     3424,
//     3638,
//     3852,
//     4066,
//     4280,
//   ],
//   [
//     2875,
//     430,
//     645,
//     860,
//     1075,
//     1290,
//     1505,
//     1720,
//     1935,
//     2150,
//     2365,
//     2580,
//     2795,
//     3010,
//     3225,
//     3440,
//     3655,
//     3870,
//     4085,
//     4300,
//   ],
//   [
//     2876,
//     432,
//     648,
//     864,
//     1080,
//     1296,
//     1512,
//     1728,
//     1944,
//     2160,
//     2376,
//     2592,
//     2808,
//     3024,
//     3240,
//     3456,
//     3672,
//     3888,
//     4104,
//     4320,
//   ],
//   [
//     2877,
//     434,
//     651,
//     868,
//     1085,
//     1302,
//     1519,
//     1736,
//     1953,
//     2170,
//     2387,
//     2604,
//     2821,
//     3038,
//     3255,
//     3472,
//     3689,
//     3906,
//     4123,
//     4340,
//   ],
//   [
//     2878,
//     436,
//     654,
//     872,
//     1090,
//     1308,
//     1526,
//     1744,
//     1962,
//     2180,
//     2398,
//     2616,
//     2834,
//     3052,
//     3270,
//     3488,
//     3706,
//     3924,
//     4142,
//     4360,
//   ],
//   [
//     2879,
//     438,
//     657,
//     876,
//     1095,
//     1314,
//     1533,
//     1752,
//     1971,
//     2190,
//     2409,
//     2628,
//     2847,
//     3066,
//     3285,
//     3504,
//     3723,
//     3942,
//     4161,
//     4380,
//   ],
//   [
//     2880,
//     440,
//     660,
//     880,
//     1100,
//     1320,
//     1540,
//     1760,
//     1980,
//     2200,
//     2420,
//     2640,
//     2860,
//     3080,
//     3300,
//     3520,
//     3740,
//     3960,
//     4180,
//     4400,
//   ],
//   [
//     2881,
//     442,
//     663,
//     884,
//     1105,
//     1326,
//     1547,
//     1768,
//     1989,
//     2210,
//     2431,
//     2652,
//     2873,
//     3094,
//     3315,
//     3536,
//     3757,
//     3978,
//     4199,
//     4420,
//   ],
//   [
//     2882,
//     444,
//     666,
//     888,
//     1110,
//     1332,
//     1554,
//     1776,
//     1998,
//     2220,
//     2442,
//     2664,
//     2886,
//     3108,
//     3330,
//     3552,
//     3774,
//     3996,
//     4218,
//     4440,
//   ],
//   [
//     2883,
//     446,
//     669,
//     892,
//     1115,
//     1338,
//     1561,
//     1784,
//     2007,
//     2230,
//     2453,
//     2676,
//     2899,
//     3122,
//     3345,
//     3568,
//     3791,
//     4014,
//     4237,
//     4460,
//   ],
//   [
//     2884,
//     448,
//     672,
//     896,
//     1120,
//     1344,
//     1568,
//     1792,
//     2016,
//     2240,
//     2464,
//     2688,
//     2912,
//     3136,
//     3360,
//     3584,
//     3808,
//     4032,
//     4256,
//     4480,
//   ],
//   [
//     2885,
//     450,
//     675,
//     900,
//     1125,
//     1350,
//     1575,
//     1800,
//     2025,
//     2250,
//     2475,
//     2700,
//     2925,
//     3150,
//     3375,
//     3600,
//     3825,
//     4050,
//     4275,
//     4500,
//   ],
//   [
//     2886,
//     452,
//     678,
//     904,
//     1130,
//     1356,
//     1582,
//     1808,
//     2034,
//     2260,
//     2486,
//     2712,
//     2938,
//     3164,
//     3390,
//     3616,
//     3842,
//     4068,
//     4294,
//     4520,
//   ],
//   [
//     2887,
//     454,
//     681,
//     908,
//     1135,
//     1362,
//     1589,
//     1816,
//     2043,
//     2270,
//     2497,
//     2724,
//     2951,
//     3178,
//     3405,
//     3632,
//     3859,
//     4086,
//     4313,
//     4540,
//   ],
//   [
//     2888,
//     456,
//     684,
//     912,
//     1140,
//     1368,
//     1596,
//     1824,
//     2052,
//     2280,
//     2508,
//     2736,
//     2964,
//     3192,
//     3420,
//     3648,
//     3876,
//     4104,
//     4332,
//     4560,
//   ],
//   [
//     2889,
//     458,
//     687,
//     916,
//     1145,
//     1374,
//     1603,
//     1832,
//     2061,
//     2290,
//     2519,
//     2748,
//     2977,
//     3206,
//     3435,
//     3664,
//     3893,
//     4122,
//     4351,
//     4580,
//   ],
// ];

let y = new SmartContractMul();

let x = y.dot_product_t2(matrix1, matrix2);
console.log(x);
console.log(x.length);
console.log(x[0].length);
console.log(JSON.stringify(x));
