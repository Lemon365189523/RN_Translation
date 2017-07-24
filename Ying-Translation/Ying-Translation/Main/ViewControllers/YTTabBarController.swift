//
//  YTTabBarController.swift
//  Ying-Translation
//
//  Created by KADFWJ on 2017/7/24.
//  Copyright © 2017年 Lemon Fan. All rights reserved.
//

import UIKit

class YTTabBarController: UITabBarController {

    lazy var normalImageArray: [UIImage] = {
        var tempArray : [UIImage] = [UIImage]()
        tempArray.append(UIImage(named: "nav_bg_1_1")!)
        tempArray.append(UIImage(named: "nav_bg_2_1")!)
        tempArray.append(UIImage(named: "nav_bg_3_1")!)
        tempArray.append(UIImage(named: "nav_bg_4_1")!)
        tempArray.append(UIImage(named: "nav_bg_5_1")!)
        return tempArray
    }()
    
    lazy var selectImageArray:[UIImage] = {
        var tempArray: [UIImage] = [UIImage]()
        tempArray.append(UIImage(named: "nav_bg_1_2")!)
        tempArray.append(UIImage(named: "nav_bg_2_2")!)
        tempArray.append(UIImage(named: "nav_bg_3_2")!)
        tempArray.append(UIImage(named: "nav_bg_4_2")!)
        tempArray.append(UIImage(named: "nav_bg_5_2")!)
        return tempArray
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    
    func creatTabBar() {
        
        let home = UIViewController()
        let homeNavi = UINavigationController.init(rootViewController: home)
        setTabBarItem(vc: homeNavi,title: "首页", normalImage:normalImageArray[0],selectImage: selectImageArray[0] )
        
        let vc2 = UIViewController()
        let navi2 = UINavigationController.init(rootViewController: vc2)
        self.setTabBarItem(vc: navi2,title: "分类", normalImage:normalImageArray[1],selectImage: selectImageArray[1] )
    }
    
    func setTabBarItem(vc: UIViewController,title: String , normalImage: UIImage, selectImage: UIImage)  {
        vc.tabBarItem.title = title
        vc.tabBarItem.image = normalImage.withRenderingMode(.alwaysOriginal)
        vc.tabBarItem.selectedImage = selectImage.withRenderingMode(.alwaysOriginal)
        
    }
}


