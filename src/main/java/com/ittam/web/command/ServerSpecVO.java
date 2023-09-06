package com.ittam.web.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServerSpecVO {
    private String spec_num;
    private String server_mfg;
    private String server_spec_warranty;
    private String server_capa;
}
