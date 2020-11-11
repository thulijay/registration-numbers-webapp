const assert = require('assert');
const reg = require('../reg-factory');

const flow = reg();

const pg = require('pg');
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'reg_tests://melissa:pg123@localhost:5432';
const pool = new Pool({
    connectionString
})

beforeEach(async function(){
    await pool.query('delete from')
})

describe('Testing Registration Numbers', function(){
    it('should be able to display a Kraaifontein number plate', function(){

    })
})