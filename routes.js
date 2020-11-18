module.exports = function regRoutes(regFactory) {

    const homeRoute = async function (req, res) {
        let towns = await regFactory.townOutcome();

        res.render('index', {
            town: towns

        })
    }

    const flashMsg = async function (req, res) {
        let registrationEntry = req.body.enterReg;
        let checkDupicate = await regFactory.duplicateReg(registrationEntry);

        if (checkDupicate !== 0) {
            req.flash('error', 'Registration number already exists');
        } else if (!registrationEntry) {
            req.flash('error', 'Please enter a registration number');
        } else if (registrationEntry.startsWith('CF ') || registrationEntry.startsWith('CY ') || registrationEntry.startsWith('CL ') || registrationEntry.startsWith('CA ')) {
            req.flash('info', 'Registration number added')
            await regFactory.workFlow(registrationEntry);
        } else if (!registrationEntry.startsWith('CF ') || !registrationEntry.startsWith('CY ') || !registrationEntry.startsWith('CL ') || !registrationEntry('CA ')) {
            req.flash('error', 'Please enter a valid registration number');
        }

        res.render('index', {
            town: await regFactory.townOutcome()
        })
    }

    const resetReg = async function (req, res) {
        let clearBtn = req.body.enterReg;
        let reset = await regFactory.resetTownBtn(clearBtn);

        reset = req.flash('info', 'Data Cleared!')

        await regFactory.resetBtn()

        res.redirect('/');
    }

    const filterReg = async function (req, res) {
        let townId = req.query.towns;
        let townFilter = await regFactory.filterBtn(townId);

        console.log({ townFilter })
        res.render('index', {
            town: townFilter
        })
    }
        return {
            homeRoute,
            flashMsg,
            resetReg,
            filterReg
        }
    }