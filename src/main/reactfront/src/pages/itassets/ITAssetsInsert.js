function ITAssetsInsert({
  handleSubmit,
  handleSelectChange,
  handleChange,
  selectedType,
  formData,
  selectedParent,
  handleParentChange,
  categories,
}) {
  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title">등록하기</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      {/* 모달 안쪽 내용 */}
      <div className="modal-body">
        <form method="POST" onSubmit={handleSubmit}>
          {/* 부모 카테고리 선택 */}
          <select onChange={handleParentChange} value={selectedParent}>
            <option>선택하지않음</option>
            {categories
              .filter((cat) => !cat.category_parent_num)
              .map((cat) => (
                <option key={cat.category_num} value={cat.category_num}>
                  {cat.category_name}
                </option>
              ))}
          </select>

          <select onChange={handleSelectChange} value={selectedType}>
            <option>선택하지않음</option>
            {categories
              .filter(
                (cat) =>
                  selectedParent && cat.category_parent_num === selectedParent
              )
              .map((cat) => (
                <option key={cat.category_num} value={cat.category_name}>
                  {cat.category_name}
                </option>
              ))}
          </select>
          {/* SWSPEC FORM태그 */}
          {selectedParent === '2' && selectedType !== '선택하지않음' && (
            <>
              <div className="row mb-3" style={{ marginTop: '10px' }}>
                <label for="inputText" className="col-sm-2 col-form-label">
                  제조사
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MFG"
                    name="sw_mfg"
                    onChange={handleChange}
                    value={formData.sw_mfg}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputEmail" className="col-sm-2 col-form-label">
                  가격
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="PRICE"
                    name="sw_price"
                    onChange={handleChange}
                    value={formData.sw_price}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputEmail" className="col-sm-2 col-form-label">
                  시리얼번호
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="SERIEL"
                    name="sw_spec_seriel"
                    onChange={handleChange}
                    value={formData.sw_spec_seriel}
                    required
                    pattern="[a-zA-Z0-9]{12}$"
                    maxLength="12"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputEmail" className="col-sm-2 col-form-label">
                  구매일
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="purchase_date"
                    name="sw_purchase_date"
                    onChange={handleChange}
                    value={formData.sw_purchase_date}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputEmail" className="col-sm-2 col-form-label">
                  AS만료일자
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="WARRANTY"
                    name="sw_spec_warranty"
                    onChange={handleChange}
                    value={formData.sw_spec_warranty}
                    required
                  />
                </div>
              </div>
            </>
          )}
          {/* 기타 form태그 */}
          {selectedParent === '3' && selectedType !== '선택하지않음' && (
            <>
              <div className="row mb-3">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  제조사
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MFG"
                    name="etc_mfg"
                    onChange={handleChange}
                    value={formData.etc_mfg}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  가격
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="PRICE"
                    name="etc_price"
                    onChange={handleChange}
                    value={formData.etc_price}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  구매일
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="PURCHASE_DATE"
                    name="etc_purchase_date"
                    onChange={handleChange}
                    value={formData.etc_purchase_date}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  AS만료일자
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="WARRANTY"
                    name="etc_spec_warranty"
                    onChange={handleChange}
                    value={formData.etc_spec_warranty}
                    required
                  />
                </div>
              </div>
            </>
          )}
          {/* PCSPEC FORM 태그 */}
          {selectedParent === '1' && selectedType !== '선택하지않음' && (
            <>
              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  CPU
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CPU"
                    name="spec_cpu"
                    onChange={handleChange}
                    value={formData.spec_cpu}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  RAM
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="RAM"
                    name="spec_ram"
                    onChange={handleChange}
                    value={formData.spec_ram}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  MainBoard
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MainBoard"
                    name="spec_mainboard"
                    onChange={handleChange}
                    value={formData.spec_mainboard}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  Power
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Power"
                    name="spec_power"
                    onChange={handleChange}
                    value={formData.spec_power}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  GPU
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="GPU"
                    name="spec_gpu"
                    onChange={handleChange}
                    value={formData.spec_gpu}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  HDD
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="HDD"
                    name="spec_hdd"
                    onChange={handleChange}
                    value={formData.spec_hdd}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  SSD
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="SSD"
                    name="spec_ssd"
                    onChange={handleChange}
                    value={formData.spec_ssd}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  OPS
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OPS"
                    name="spec_ops"
                    onChange={handleChange}
                    value={formData.spec_ops}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  시리얼번호
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="seriel"
                    name="spec_seriel"
                    onChange={handleChange}
                    value={formData.spec_seriel}
                    required
                    pattern="[a-zA-Z0-9]{12}$"
                    maxLength="12"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  제조사
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MFG"
                    name="spec_mfg"
                    onChange={handleChange}
                    value={formData.spec_mfg}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  구매일
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="PURCHASE_DATE"
                    name="spec_purchase_date"
                    onChange={handleChange}
                    value={formData.spec_purchase_date}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  AS만료일자
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="WARRANTY"
                    name="spec_warranty"
                    onChange={handleChange}
                    value={formData.spec_warranty}
                    required
                  />
                </div>
              </div>
            </>
          )}
          {/* 서버 */}
          {selectedParent === '4' && selectedType !== '선택하지않음' && (
            <>
              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  제조사
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MFG"
                    name="server_mfg"
                    onChange={handleChange}
                    value={formData.server_mfg}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  서버용량
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="server_capa"
                    name="server_capa"
                    onChange={handleChange}
                    value={formData.server_capa}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  가격
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="PRICE"
                    name="server_price"
                    onChange={handleChange}
                    value={formData.server_price}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  연결방식
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="INTERFACE"
                    name="server_interface"
                    onChange={handleChange}
                    value={formData.server_interface}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  분당회전수
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="RPM"
                    name="server_rpm"
                    onChange={handleChange}
                    value={formData.server_rpm}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  평균수명
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="AVERAGE_LIFE"
                    name="server_average_life"
                    onChange={handleChange}
                    value={formData.server_average_life}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  데이터복구 유지시간
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="DATARECOVERY_LIFE"
                    name="server_datarecovery_life"
                    onChange={handleChange}
                    value={formData.server_datarecovery_life}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  구매일
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="PURCHASE_DATE"
                    name="server_purchase_date"
                    onChange={handleChange}
                    value={formData.server_purchase_date}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputNumber" className="col-sm-2 col-form-label">
                  AS만료일자
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="WARRANTY"
                    name="server_spec_warranty"
                    onChange={handleChange}
                    value={formData.server_spec_warranty}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="row mb-3">
            <div className="col-sm-10 text-end">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                닫기
              </button>
              <button type="submit" className="btn btn-primary">
                등록하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ITAssetsInsert;
