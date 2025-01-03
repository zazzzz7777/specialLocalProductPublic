package com.cl.dao;

import com.cl.entity.SystemNoticeEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.SystemNoticeView;


/**
 * 系统公告
 * 
 * @author 
 * @email 
 * @date 2024-11-26 11:01:17
 */
public interface SystemNoticeDao extends BaseMapper<SystemNoticeEntity> {
	
	List<SystemNoticeView> selectListView(@Param("ew") Wrapper<SystemNoticeEntity> wrapper);

	List<SystemNoticeView> selectListView(Pagination page,@Param("ew") Wrapper<SystemNoticeEntity> wrapper);
	
	SystemNoticeView selectView(@Param("ew") Wrapper<SystemNoticeEntity> wrapper);


}
