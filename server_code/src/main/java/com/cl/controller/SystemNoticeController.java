package com.cl.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import com.cl.utils.ValidatorUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cl.annotation.IgnoreAuth;
import com.cl.annotation.SysLog;

import com.cl.entity.SystemNoticeEntity;
import com.cl.entity.view.SystemNoticeView;

import com.cl.service.SystemNoticeService;
import com.cl.service.TokenService;
import com.cl.utils.PageUtils;
import com.cl.utils.R;
import com.cl.utils.MPUtil;
import com.cl.utils.MapUtils;
import com.cl.utils.CommonUtil;

/**
 * 系统公告
 * 后端接口
 * @author 
 * @email 
 * @date 2024-11-26 11:01:17
 */
@RestController
@RequestMapping("/systemnotice")
public class SystemNoticeController {
    @Autowired
    private SystemNoticeService systemNoticeService;







    /**
     * 后台列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,SystemNoticeEntity systemNotice,
                        HttpServletRequest request){
                                    EntityWrapper<SystemNoticeEntity> ew = new EntityWrapper<SystemNoticeEntity>();
                            
        
        
        PageUtils page = systemNoticeService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, systemNotice), params), params));
        return R.ok().put("data", page);
    }
    
    
    
    
    
    
    
    /**
     * 前端列表
     */
	@IgnoreAuth
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,SystemNoticeEntity systemNotice, 
		HttpServletRequest request){
        EntityWrapper<SystemNoticeEntity> ew = new EntityWrapper<SystemNoticeEntity>();

		PageUtils page = systemNoticeService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, systemNotice), params), params));
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( SystemNoticeEntity systemNotice){
       	EntityWrapper<SystemNoticeEntity> ew = new EntityWrapper<SystemNoticeEntity>();
      	ew.allEq(MPUtil.allEQMapPre( systemNotice, "systemNotice")); 
        return R.ok().put("data", systemNoticeService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(SystemNoticeEntity systemNotice){
        EntityWrapper< SystemNoticeEntity> ew = new EntityWrapper< SystemNoticeEntity>();
 		ew.allEq(MPUtil.allEQMapPre( systemNotice, "systemNotice")); 
		SystemNoticeView systemNoticeView =  systemNoticeService.selectView(ew);
		return R.ok("查询系统公告成功").put("data", systemNoticeView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        SystemNoticeEntity systemNotice = systemNoticeService.selectById(id);
		systemNotice = systemNoticeService.selectView(new EntityWrapper<SystemNoticeEntity>().eq("id", id));
        return R.ok().put("data", systemNotice);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        SystemNoticeEntity systemNotice = systemNoticeService.selectById(id);
		systemNotice = systemNoticeService.selectView(new EntityWrapper<SystemNoticeEntity>().eq("id", id));
        return R.ok().put("data", systemNotice);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    @SysLog("新增系统公告")
    public R save(@RequestBody SystemNoticeEntity systemNotice, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(systemNotice);
        systemNoticeService.insert(systemNotice);
        return R.ok();
    }
    
    /**
     * 前端保存
     */
    @SysLog("新增系统公告")
    @RequestMapping("/add")
    public R add(@RequestBody SystemNoticeEntity systemNotice, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(systemNotice);
        systemNoticeService.insert(systemNotice);
        return R.ok();
    }



    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    @SysLog("修改系统公告")
    public R update(@RequestBody SystemNoticeEntity systemNotice, HttpServletRequest request){
        //ValidatorUtils.validateEntity(systemNotice);
        systemNoticeService.updateById(systemNotice);//全部更新
        return R.ok();
    }



    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @SysLog("删除系统公告")
    public R delete(@RequestBody Long[] ids){
        systemNoticeService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }
    
	









}
