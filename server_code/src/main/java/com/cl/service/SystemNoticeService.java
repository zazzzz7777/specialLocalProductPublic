package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.SystemNoticeEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.SystemNoticeView;


/**
 * 系统公告
 *
 * @author 
 * @email 
 * @date 2024-11-26 11:01:17
 */
public interface SystemNoticeService extends IService<SystemNoticeEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<SystemNoticeView> selectListView(Wrapper<SystemNoticeEntity> wrapper);
   	
   	SystemNoticeView selectView(@Param("ew") Wrapper<SystemNoticeEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<SystemNoticeEntity> wrapper);
   	
   
}

