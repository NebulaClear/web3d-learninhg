// 引入three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
/**
 * 创建3D场景对象Scene
 */
const scene = new THREE.Scene();

/**
 * 创建网格模型
 */
//创建一个长方体几何对象Geometry
const geometry = new THREE.BoxGeometry(50, 50, 50);
//材质对象Material
const material = new THREE.MeshLambertMaterial({
    color: 0xffffff, //设置材质颜色
    transparent: true, // 开启材质的半透明
    opacity:.5 // 透明度设置
});
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
//设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0,10,0);
const axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );
scene.add(mesh); //网格模型添加到场景中



// 创建一个光源对象-点光源
const pointLight = new THREE.PointLight(0xfffff,1.0);
pointLight.intensity = 1.0;
pointLight.decay = 0.0;//设置光源不随距离衰减
pointLight.position.set(400, 400, 200);
scene.add(pointLight); //点光源添加到场景中


// width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
const width = 800; //宽度
const height = 500; //高度
/**
 * 透视投影相机设置
 */
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185); //相机在Three.js三维坐标系中的位置
camera.lookAt(0, 0, 0); //相机观察目标指向Three.js坐标系原点



/**
 * 创建渲染器对象
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
renderer.render(scene, camera); //执行渲染操作
//three.js执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
document.body.appendChild(renderer.domElement);


// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件

controls.addEventListener('change', function () {// 浏览器控制台查看相机位置变化
    console.log('camera.position',camera.position);
});
