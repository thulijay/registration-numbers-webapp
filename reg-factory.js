module.exports = function registrationNumbers(pool) {

    async function workFlow(item){

    const regEntry = item

    const dbTownsId = await pool.query(`select id from town where reg_id = $1`, [regEntry]);
    console.log(dbTownsId)
    const townsId = dbTownsId.rows[0];


    let selectRegistration = await pool.query('select * from registration_num where reg_number = $1', [townsId]);

    if (selectRegistration.rowCount === 0) {
        await pool.query('INSERT INTO registration_num (reg_number, town_id) values ($1,$2)', [regEntry, townsId]);
        return true;
    }
}


async function duplicateReg(regEntry) {
    let CHECK_QUERY = await pool.query('select reg_number from registration_num where reg_number = $1', [regEntry]);
    return CHECK_QUERY.rowCount;
}

async function getTownId(townId) {
    let REG_QUERY = await pool.query("select id from town where reg_id = $1", [townId]);
    return REG_QUERY.rows[0][id];
}

async function regOutcome() {
    let TOWN_QUERY = await pool.query('select reg_number, town_id from registration_num');
    return TOWN_QUERY.rows;
}

async function townOutcome() {
    let TOWNS_QUERY = await pool.query('select * from registration_num');
    return TOWNS_QUERY.rows;
}

async function getReg(regId) {
    let GET_QUERY = await pool.query('select reg_number from registration_num where town_id = $1', [regId]);
    return GET_QUERY.rows
}

async function resetBtn() {
    let RESET_QUERY = await pool.query('DELETE FROM registration_num');
}

async function resetTownBtn(){
    let touched = false;

    if(!touched){
        await resetBtn();
        // return 'Database Cleared!'
    }
}

async function filterBtn(filterReg) {
    console.log({ filterReg });


    if (filterReg === 'all') {
        let filteredTown = await townOutcome();
        return filteredTown;
    } else {
        let testing = await getReg(filterReg);
        console.log(testing);
        return testing;
    }
}
return {
    workFlow,
    duplicateReg,
    regOutcome,
    townOutcome,
    resetBtn,
    filterBtn,
    getReg,
    resetTownBtn
}
}