package com.ittam.web.notice.service;

import com.ittam.web.aws.S3Uploader;
import com.ittam.web.command.NoticeImgVO;
import com.ittam.web.command.NoticeSearchVO;
import com.ittam.web.command.NoticeVO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.*;

@AllArgsConstructor
@Service("noticeService")
public class NoticeServiceImpl  implements NoticeService{

    private final S3Uploader s3Uploader;

    @Autowired
    private NoticeMapper noticeMapper;

    @Override
    public ArrayList<NoticeVO> getNotice() {
        return noticeMapper.getNotice();
    }

    @Override
    public NoticeVO getDetail(String id) {
        return noticeMapper.getDetail(id);
    }

    @Override
    public NoticeImgVO getDetailImg(String id){return noticeMapper.getDetailImg(id);};


    @Override
    public void postNotice(NoticeVO noticeVO, List<MultipartFile> multipartFiles) {

        noticeMapper.postNoticeSingle(noticeVO);

        Date currentDate = new Date();
        Timestamp currentTimestamp = new Timestamp(currentDate.getTime());

        List<NoticeImgVO> noticeImgVOList;

        if(!multipartFiles.isEmpty()){
            noticeImgVOList = s3Uploader.uploadImage(multipartFiles);
            noticeImgVOList.forEach(noticeImgVO -> {
                noticeImgVO.setNotice_num2(noticeVO.getNotice_num());
                noticeImgVO.setNoticeimg_regdate(currentTimestamp);
            });

            noticeMapper.postNoticeImgList(noticeImgVOList);
        }



//        Map<String, Object> params = new HashMap<>();
//        params.put("notice", noticeVO);
//        params.put("noticeImgList", noticeImgVOList);
//        noticeMapper.postNotice(params);
    }

    @Override
    public void updateNotice(NoticeVO noticeVO, List<MultipartFile> multipartFiles) {
        noticeMapper.updateNotice(noticeVO);


        Date currentDate = new Date();
        Timestamp currentTimestamp = new Timestamp(currentDate.getTime());

        List<NoticeImgVO> noticeImgVOList;

        if(!multipartFiles.isEmpty()){
            noticeImgVOList = s3Uploader.uploadImage(multipartFiles);
            noticeImgVOList.forEach(noticeImgVO -> {
                noticeImgVO.setNotice_num2(noticeVO.getNotice_num());
                noticeImgVO.setNoticeimg_regdate(currentTimestamp);
                System.out.println((noticeImgVO));
            });
            System.out.println("==================");
            System.out.println(noticeImgVOList.get(0).getNotice_num2());
            noticeMapper.updateNoticeImg(noticeImgVOList.get(0));
        }
    }



    @Override
    public void deleteNotice(NoticeVO noticeVO) {
        noticeMapper.deleteNotice(noticeVO);
    }

    @Override
    public void deleteNoticeImg(NoticeImgVO noticeimgVO) {
        noticeMapper.deleteNoticeImg(noticeimgVO);
    }

    @Override
    public NoticeVO getNoticeOne(Long notice_num) {
        return noticeMapper.getNoticeOne(notice_num);
    }

    @Override
    public List<NoticeVO> searchNoticeByTitle(String title) {
        return noticeMapper.searchNoticeByTitle(title);
    }

    @Override
    public List<NoticeVO> searchNoticeByContent(String content) {
        return noticeMapper.searchNoticeByContent(content);
    }

    @Override
    public List<NoticeVO> searchNoticeIsActive() {
        return noticeMapper.searchNoticeIsActive();
    }

    @Override
    public List<NoticeVO> searchNoticeIsExpire() {
        return noticeMapper.searchNoticeIsExpire();
    }

    @Override
    public List<NoticeVO> searchNoticeByDate(NoticeSearchVO noticeSearchVO) {
        return noticeMapper.searchNoticeByDate(noticeSearchVO);
    }

    @Override
    public void upperNoticeHits(String notice_num) {
        noticeMapper.upperNoticeHits(notice_num);
    }


}
