import React, {useState} from 'react';
import { Link } from 'react-router-dom';
const AssetAllListTable = ({isChecked, toggleAllCheckboxes, index,
                               assets_name,assets_status,spec_mfg,spec_seriel,spec_warranty,category_name,spec_num,assets_num,sw_mfg,sw_spec_seriel,sw_spec_warranty,sw_purchase_date,
                               sw_price,etc_mfg,etc_spec_warranty,etc_purchase_date,etc_price,spec_cpu,spec_ram,spec_mainboard,spec_power,spec_gpu,spec_hdd,spec_ssd,spec_ops,spec_purchase_date,
                               server_mfg, server_spec_warranty, server_capa, server_price, server_purchase_date, server_interface, server_average_life, server_rpm, server_datarecovery_life,
                               username, appro_title, appro_comment, category_num,
                               func, handleModal

                           }) => {
    let categoryName;
    switch (category_num) {
        case 5:case 6:
            categoryName = 'PC/노트북';
            break;
        case 7:case 8:case 9:case 10:case 11:case 12:
            categoryName = '소프트웨어';
            break;
        case 13:case 14:case 15:case 16:case 17:
            categoryName = '기타';
            break;
        case 18:
            categoryName = '서버';
            break;
        default:
            categoryName = '';
            break;
    }

    const item = [
        assets_name,assets_status,spec_mfg,spec_seriel,spec_warranty,category_name,spec_num,assets_num,sw_mfg,sw_spec_seriel,sw_spec_warranty,sw_purchase_date,
        sw_price,etc_mfg,etc_spec_warranty,etc_purchase_date,etc_price,spec_cpu,spec_ram,spec_mainboard,spec_power,spec_gpu,spec_hdd,spec_ssd,spec_ops,spec_purchase_date,
        server_mfg, server_spec_warranty, server_capa, server_price, server_purchase_date, server_interface, server_average_life, server_rpm, server_datarecovery_life,
        username, appro_title, appro_comment];


    const [isCheckedLocal, setIsCheckedLocal] = useState(false); // 로컬 체크 상태
    const [isButtonVisible, setIsButtonVisible] = useState(false); // 초기에는 버튼 숨김
    // 체크박스 변경 이벤트 핸들러
    const handleCheckboxChange = () => {
        setIsCheckedLocal(!isCheckedLocal); // 로컬 상태를 토글
        // 여기에서 부모 컴포넌트의 toggleAllCheckboxes 함수 호출로 전체 체크 상태 업데이트
        console.log(isChecked + "BBBBBBBBBBBBBBBBBBBBB")
        console.log(assets_name)
    };
    const handleCheckboxChange2 = () => {
        setIsCheckedLocal(!isCheckedLocal); // 로컬 상태를 토글
        // 여기에서 부모 컴포넌트의 toggleAllCheckboxes 함수 호출로 전체 체크 상태 업데이트
        console.log(isChecked + "CCCCCCCCCCCCCCCCC")
        console.log(assets_name);
    };



    return (
        <tr className="prod-box">

            <th>
                {isChecked ? (
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                ) : (
                    <input
                        type="checkbox"
                        checked={isCheckedLocal}
                        onChange={handleCheckboxChange}
                    />
                )}
            </th>
            <th scope="row">{index + 1}</th>
            <td>
                <Link
                    to="#"
                    style={{ color: 'black' }}
                    onClick={() => handleModal(item)}
                    data-bs-toggle="modal"
                    data-bs-target="#modalDialogScrollable"
                >
                    {assets_name}
                </Link>
            </td>
            <td className="assets_status">{assets_status}</td>
            {/*<td className="spec_mfg">{spec_mfg}</td>*/}
            {/*<td className="spec_seriel">{spec_seriel}</td>*/}
            {/*<td className="spec_warranty">{spec_warranty}</td>*/}
            <td className="category_name">{categoryName}</td>

            <th className="assets_name" style={{ display: "none" }}>{assets_name}</th>
            <th className="category_num" style={{ display: "none" }}>{category_num}</th>
            <th className="spec_num" style={{ display: "none" }}>{spec_num}</th>
            <th className="assets_num" style={{ display: "none" }}>{assets_num}</th>
            <td>
                <button className="btn btn-primary approveBtn" type="button"   data-bs-formtarget="#basicModal" onClick={func} id="assetRequestBtn">사용신청</button>
            </td>
        </tr>

    );

}

export default AssetAllListTable;
