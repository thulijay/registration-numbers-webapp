const assert = require('assert');
const reg = require('../reg-factory');
const regFactory = require('../reg-factory');
describe('Testing Registration Numbers', function(){


const pg = require('pg');
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgres://melissa:pg123@localhost:5432/reg_tests';
const pool = new Pool({
    connectionString
})
const flow = reg(pool);

beforeEach(async function(){        
    await pool.query('delete from registration_num');
});

    it('should be not take a number plate from any other place besides CF, CY, CL and CA', async function(){
            let flow = reg(pool);
    
        assert.equal(false,await flow.townOutcome('CAA 458 566'));

    })
    // it('should be able to add a registration number from Kraaifontein', async function(){
    //     let flow = reg(pool);

    //     assert.equal([],await flow.townOutcome('CF 458 566'));
    // })

  
    it('should be able to add a registration number from Kraaifontein', async function(){
        let flow = reg(pool);

          await flow.getReg();
             let outReg = await flow.townOutcome('CF 789 561');
    
            assert.equal(undefined, outReg.rows)
    })

    it('should be able to add a registration number from Bellville', async function(){
        let flow = reg(pool);

          await flow.getReg();
             let outReg = await flow.townOutcome('CY 896 561');
    
            assert.equal(undefined, outReg.rows)
    })

    it('should be able to add a registration number from Stellenbosh', async function(){
        let flow = reg(pool);

          await flow.getReg();
             let outReg = await flow.townOutcome('CL 145 666');
    
            assert.equal(undefined, outReg.rows)
    })
    it('should be able to add a registration number from Cape Town', async function(){
        let flow = reg(pool);

          await flow.getReg();
             let outReg = await flow.townOutcome('CA 745 561');
    
            assert.equal(undefined, outReg.rows)
    })
    it('should be able to clear data', async function(){
        let flow = reg(pool);

        await flow.townOutcome('CF 478 455');
        await flow.townOutcome('CL 878 455');
        await flow.townOutcome('CY 478 455');
        await flow.townOutcome('CA 478 455');

        assert.equal(await flow.resetBtn(), undefined)
    })
    
})
    // it('should be able to add a registration number from Kraaifontein', async function(){
    //     let flow = reg(pool);
    //     let outReg = await flow.workFlow('CF 484 526');

    //     assert.equal([{'reg_numbers':'CF 484 526'}], await flow.regOutcome());
    // })
    // it('should be able to add a regostration number from Bellville ', async function(){
    //     let flow = reg(pool);

    //     await flow.getReg(regId)
    //     let outReg = await flow.regOutcome('CY 789 561');

    //     assert.equal(1, outReg.rows)
    // })
