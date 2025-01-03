package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.DiscussforumEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.DiscussforumView;


/**
 * forum评论表
 *
 * @author 
 * @email 
 * @date 2024-11-26 11:01:18
 */
public interface DiscussforumService extends IService<DiscussforumEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<DiscussforumView> selectListView(Wrapper<DiscussforumEntity> wrapper);
   	
   	DiscussforumView selectView(@Param("ew") Wrapper<DiscussforumEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<DiscussforumEntity> wrapper);
   	
   
}

