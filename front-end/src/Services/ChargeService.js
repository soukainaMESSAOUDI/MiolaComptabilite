import axios from 'axios';
const Charge_URL = "http://localhost:8080/charges";
class ChargeService {
    getChargeById(chargeId) {
        return axios.get(Charge_URL + '/' + chargeId);
    }
    updateCharge(charge, chargeId) {
        return axios.put("http://localhost:8080/update-charges/" + chargeId, charge);
    }

    deleteCharge(chargeId) {
        return axios.delete("http://localhost:8080/delete-charge/" + chargeId)
    }
}

export default new ChargeService();