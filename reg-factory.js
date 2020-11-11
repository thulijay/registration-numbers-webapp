module.exports = function registrationNumbers(pool) {

    async function workFlow(regEntry) {

        regEntry = regEntry.toUpperCase();

        let townId = await getTownId(regEntry.split(" ")[0]);

        let selectRegistration = await pool.query('SELECT reg_number FROM registration_num WHERE reg_number = $1', [regEntry]);

        if (selectRegistration.rowCount === 0) {
            await pool.query('INSERT INTO registration_num (reg_number, town_id) VALUES ($1,$2)', [regEntry, townId]);
            return true;
        }
    }


    async function duplicateReg(regEntry) {
        let CHECK_QUERY = await pool.query('SELECT reg_number FROM registration_num WHERE reg_number = $1', [regEntry]);
        return CHECK_QUERY.rowCount;
    }

    async function getTownId(townId) {
        let REG_QUERY = await pool.query("SELECT id FROM town WHERE reg_id = $1", [townId]);
        return REG_QUERY.rows[0]["id"];
    }

    async function regOutcome() {
        let TOWN_QUERY = await pool.query('SELECT reg_number, town_id FROM registration_num');
        return TOWN_QUERY.rows;
    }

    async function townOutcome() {
        let TOWNS_QUERY = await pool.query('SELECT reg_number FROM registration_num');
        return TOWNS_QUERY.rows;
    }

    async function resetBtn() {
        await pool.query('DELETE FROM registration_num');
    }

    async function filterBtn(filterReg){

        if(filterReg = 'all'){
            let filteredTown = await getTownId();
            return filteredTown.rows
        }
    }
    return {
        workFlow,
        duplicateReg,
        regOutcome,
        townOutcome,
        resetBtn
    }
}