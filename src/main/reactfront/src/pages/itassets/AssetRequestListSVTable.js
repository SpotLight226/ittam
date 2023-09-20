import {Link} from "react-router-dom";
import React from "react";

const AssetRequestListSVTable = ({index,
                                     assets_name,assets_status,spec_mfg,spec_seriel,spec_warranty,category_name,spec_num,assets_num,sw_mfg,sw_spec_seriel,sw_spec_warranty,sw_purchase_date,
                                     sw_price,etc_mfg,etc_spec_warranty,etc_purchase_date,etc_price,spec_cpu,spec_ram,spec_mainboard,spec_power,spec_gpu,spec_hdd,spec_ssd,spec_ops,spec_purchase_date,
                                     server_mfg, server_spec_warranty, server_capa, server_price, server_purchase_date, server_interface, server_average_life, server_rpm, server_datarecovery_life,
                                     username, appro_title, appro_comment,
                                     func, handleModal
                                 }) => {

    const item = [
        assets_name,assets_status,spec_mfg,spec_seriel,spec_warranty,category_name,spec_num,assets_num,sw_mfg,sw_spec_seriel,sw_spec_warranty,sw_purchase_date,
        sw_price,etc_mfg,etc_spec_warranty,etc_purchase_date,etc_price,spec_cpu,spec_ram,spec_mainboard,spec_power,spec_gpu,spec_hdd,spec_ssd,spec_ops,spec_purchase_date,
        server_mfg, server_spec_warranty, server_capa, server_price, server_purchase_date, server_interface, server_average_life, server_rpm, server_datarecovery_life,
        username, appro_title, appro_comment];

    return (
        <tr className="prod-box">
            <th>
                <input type={"checkbox"}/>
            </th>
            <th scope="row">{index + 1}</th>
            <td className="assets_name">
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
            <td className="spec_mfg">{spec_mfg}</td>
            <td className="spec_seriel">{spec_seriel}</td>
            <th className="spec_warranty">{spec_warranty}</th>
            <th className="category_name">{category_name}</th>
            <th className="spec_num" style={{ display: "none" }}>{spec_num}</th>
            <th className="assets_num" style={{ display: "none" }}>{assets_num}</th>
            <td>
                <button className="btn btn-primary approveBtn" type="button"   data-bs-formtarget="#basicModal" onClick={func} id="approveBtn">사용신청</button>
            </td>
        </tr>
    );
}

export default AssetRequestListSVTable;