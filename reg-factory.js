module.exports = function registrationNumbers(pool) {

    async function workFlow(regEntry) {

        regEntry = regEntry.toUpperCase();

        let townId = await getTownId(regEntry.split(" ")[0]);


        if (regEntry.length <= 10) {
            let selectRegistration = await pool.query('select reg_number from registration_num where reg_number = $1', [regEntry]);
        
        if (selectRegistration.rowCount === 0) {
            await pool.query('insert into registration_num (reg_number, town_id) values ($1,$2)', [regEntry, townId]);
        }
            return false;
        }
    }


    async function insertData(insertReg){
        let INSERT_QUERY = await pool.query('insert into registration_num (reg_number) values ($1)', [insertReg]);
        return INSERT_QUERY.rows;
    }

    async function duplicateReg(regEntry) {
        let CHECK_QUERY = await pool.query('select reg_number from registration_num where reg_number = $1', [regEntry]);
        return CHECK_QUERY.rowCount;
    }

    async function getTownId(towns) {
        let REG_QUERY = await pool.query("select id from town where reg_id = $1", [towns]);
        return REG_QUERY.rows[0]['id'];
    }

    async function townOutcome() {
        let TOWNS_QUERY = await pool.query('select reg_number from registration_num');
        return TOWNS_QUERY.rows;
    }

    async function resetBtn() {
        await pool.query('DELETE FROM registration_num');
    }

    async function getReg(regId) {
        let GET_QUERY = await pool.query('select reg_number from registration_num where town_id = $1', [regId]);
        return GET_QUERY.rows
    }

    async function resetTownBtn(){
        let resetTown = false;
    
        if(!resetTown){
            await resetBtn();
        }
    }
    
    async function filterBtn(filterReg) {
        if (filterReg === 'all') {
            let filteredTown = await townOutcome();
            return filteredTown;
        } else {
            let testing = await getReg(filterReg);
            return testing;
        }
    }
    return {
        workFlow,
        duplicateReg,
        townOutcome,
        resetBtn, 
        filterBtn,
        resetTownBtn,
        insertData,
        getReg
    }
}
