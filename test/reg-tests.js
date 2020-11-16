const assert = require('assert');
const reg = require('../reg-factory');
describe('Testing Registration Numbers', function(){

const flow = reg();

const pg = require('pg');
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgres://melissa:pg123@localhost:5432/reg_tests';
const pool = new Pool({
    connectionString
})

beforeEach(async function(){        
    await pool.query('delete from registration_num');
});

    it('should be not take a number plate from any other place besides CF, CY, CL and CA', async function(){
            let flow = reg(pool);
    
        assert.equal(false,await flow.townOutcome('CAA 458 566'));

    })
    it('should be able to display a registration number from Kraaifontein', async function(){
        let flow = reg(pool)

        await flow.workFlow('CF 785 569');

        let regOut = await flow.townOutcome()

        assert.equal(1, regOut.rows)
        // let flow = reg(pool);
        // let outReg = await flow.regOutcome('CF');

        // assert.equal(outReg, []);
    })
})