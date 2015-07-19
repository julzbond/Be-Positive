BloodType = {

  AB_POS : "AB_POS",
  AB_NEG : "AB_NEG",
  A_POS  : "A_POS",
  A_NEG  : "A_NEG",
  B_POS  : "B_POS",
  B_NEG  : "B_NEG",
  O_POS  : "O_POS",
  O_NEG  : "O_NEG"

};

BloodTransfusionRules = {

  /**
   * Set the simulation speed.
   * @type {Number} : Valid values between 1 and 200
   */
  simulation_speed : 1000,

  /**
   * returns BloodType, or false to give no BloodType
   *
   * @name receive_patient
   * @param {Bank} blood_inventory
   * @param {Patient} patient
   * @returns {BloodType or false}
   *
   * Patient properties {
   *   gender : String, (MALE,FEMALE)
   *   blood_type : String (BloodType)
   * }
   *
   * Bank properties {
   *   AB_POS : Integer,
   *   AB_NEG : Integer,
   *   A_POS  : Integer,
   *   A_NEG  : Integer,
   *   B_POS  : Integer,
   *   B_NEG  : Integer,
   *   O_POS  : Integer,
   *   O_NEG  : Integer
   * }
   *
   */

  receive_patient : function (blood_inventory, patient) {

    var bloodMatch = {
      AB_POS : ["AB_POS","AB_NEG", "A_POS", "A_NEG", "B_POS", "B_NEG", "O_POS", "O_NEG"],
      AB_NEG : ["AB_NEG", "A_NEG", "B_NEG", "O_NEG"],
      A_POS  : ["A_POS", "A_NEG", "O_POS", "O_NEG"],
      A_NEG  : ["A_NEG", "O_NEG"],
      B_POS  : ["B_POS", "B_NEG", "O_POS", "O_NEG"],
      B_NEG  : ["B_NEG", "O_NEG"],
      O_POS  : ["O_POS", "O_NEG"],
      O_NEG  : ["O_NEG"]
    };

    var inventory = {};
    checkInventory();
    function checkInventory() {
      for (var i = 0; i < bloodMatch[patient.blood_type].length; i++){
        var type = bloodMatch[patient.blood_type][i];
        inventory[type] = blood_inventory[type];
      };
      var max = 0;
      for (key in inventory) {
        if (inventory[key] > max){
          max = inventory[key];
        };
      };
      console.log(max);
    };

    console.log(inventory);

    if (patient.blood_type === BloodType[patient.blood_type]){
      if (blood_inventory[patient.blood_type] !== 0){
        return BloodType[patient.blood_type];
      };
    } else {
      return false;
    }
  }
};