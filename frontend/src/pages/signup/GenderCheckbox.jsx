const GenderCheckbox = ({ onCheckboxChanged, selectedGender }) => {
  return (
    <>
      <div className="flex mt-2">
        <div className="form-control">
          <label
            className={`label gap-2 cursor-pointer ${
              selectedGender === "male" ? "selected" : ""
            }`}
          >
            <span className="label-text">Male</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary border-gray-900"
              checked={selectedGender === "male"}
              onChange={() => onCheckboxChanged("male")}
            />
          </label>
        </div>

        <div className="form-control">
          <label
            className={`label gap-2 cursor-pointer ${
              selectedGender === "female" ? "selected" : ""
            }`}
          >
            <span className="label-text">Female</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary border-gray-900"
              checked={selectedGender === "female"}
              onChange={() => onCheckboxChanged("female")}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default GenderCheckbox;
