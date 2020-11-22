const assert = require('assert');
const reg = require('../reg-factory');
const regFactory = require('../reg-factory');
describe('Testing Registration Numbers', function () {


  const pg = require('pg');
  const Pool = pg.Pool;
  const connectionString = process.env.DATABASE_URL || 'postgres://melissa:pg123@localhost:5432/reg_tests';
  const pool = new Pool({
    connectionString
  })
  const flow = reg(pool);

  beforeEach(async function () {
    await pool.query('delete from registration_num');
  });

  it('should be not take a number plate from any other place besides CF, CY, CL and CA', async function () {
    let flow = reg(pool);

    assert.equal(false, await flow.townOutcome('CAA 458 566'));

  })

  it('should be able to add a registration number from Kraaifontein', async function () {
    let flow = reg(pool);

    await flow.workFlow('CF 689 561');
    await flow.workFlow('CF 745 789');
    await flow.workFlow('CF 145 208');

    let outReg = await flow.townOutcome();

    assert.deepStrictEqual(outReg, [{ reg_number: 'CF 689 561' },
    { reg_number: 'CF 745 789' },
    { reg_number: 'CF 145 208' }
    ])
  })

  it('should be able to add a registration number from Bellville', async function () {
    let flow = reg(pool);

    await flow.workFlow('CY 689 561');
    await flow.workFlow('CY 745 789');
    await flow.workFlow('CY 145 208');

    let outReg = await flow.townOutcome();

    assert.deepStrictEqual(outReg, [{ reg_number: 'CY 689 561' },
    { reg_number: 'CY 745 789' },
    { reg_number: 'CY 145 208' }
    ])
  })

  it('should be able to add a registration number from Stellenbosh', async function () {
    let flow = reg(pool);

    await flow.workFlow('CL 689 561');
    await flow.workFlow('CL 745 789');
    await flow.workFlow('CL 145 208');

    let outReg = await flow.townOutcome();

    assert.deepStrictEqual(outReg, [{ reg_number: 'CL 689 561' },
    { reg_number: 'CL 745 789' },
    { reg_number: 'CL 145 208' }
    ])
  })

  it('should be able to add a registration number from Cape Town', async function () {
    let flow = reg(pool);

    await flow.workFlow('CA 689 561');
    await flow.workFlow('CA 745 789');
    await flow.workFlow('CA 145 208');

    let outReg = await flow.townOutcome();

    assert.deepStrictEqual(outReg, [{ reg_number: 'CA 689 561' },
    { reg_number: 'CA 745 789' },
    { reg_number: 'CA 145 208' }])
  })

  it('should be able to clear data', async function () {
    let flow = reg(pool);

    await flow.townOutcome('CF 478 455');
    await flow.townOutcome('CL 878 455');
    await flow.townOutcome('CY 478 455');
    await flow.townOutcome('CA 478 455');

    assert.deepStrictEqual(await flow.resetBtn(), undefined)
  })

  it('should only filter Cape Town', async function () {
    let flow = reg(pool);

    await flow.workFlow('CA 689-561');
    await flow.workFlow('CL 745 789');
    await flow.workFlow('CL 145 208');

    let outReg = await flow.filterBtn(8);
// console.log(outReg)
    assert.deepStrictEqual(outReg, [{ reg_number: 'CA 689-561' }])
  })

  it('should only filter Kraaifontein', async function () {
    let flow = reg(pool);

    await flow.workFlow('CF 889-561');
    await flow.workFlow('CA 745 789');
    await flow.workFlow('CL 145 208');

    let outReg = await flow.filterBtn(5);

    assert.deepStrictEqual(outReg, [{ reg_number: 'CF 889-561' }])
  })

  it('should only filter Stellenbosch', async function () {
    let flow = reg(pool);

    await flow.workFlow('CL 689-561');
    await flow.workFlow('CA 745 789');
    await flow.workFlow('CY 145 208');

    let outReg = await flow.filterBtn(7);
// console.log(outReg)
    assert.deepStrictEqual(outReg, [{ reg_number: 'CL 689-561' }])
  })

  it('should only filter Belville', async function () {
    let flow = reg(pool);

    await flow.workFlow('CY 689-561');
    await flow.workFlow('CA 745 789');
    await flow.workFlow('CL 145 208');

    let outReg = await flow.filterBtn(6);
// console.log(outReg)
    assert.deepStrictEqual(outReg, [{ reg_number: 'CY 689-561' }])
  })
})
