const { Bilan, BilanComposition, TypeBilan } = require('../models');

async function createBilanAndComposition(bilanData) {
    try {
        const { PatientId, TypeBilanIds, dateBilan, observation } = bilanData;
        // Check if TypeBilanIds is an array
console.log(bilanData);

        const bilan = await Bilan.create({
            PatientId,
            dateBilan,
            observation
        });

        for (const TypeBilanId of TypeBilanIds) {
            await BilanComposition.create({
                BilanId: bilan.id,
                TypeBilanId
            });
        }

        return await Bilan.findOne({
            where: { id: bilan.id },
        });
        

    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    createBilanAndComposition
};
