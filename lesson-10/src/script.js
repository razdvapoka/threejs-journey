import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'

const gui = new dat.GUI({ width: 400 })

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(cube1.rotation, { duration: 1, y: cube1.rotation.y + Math.PI * 2 })
  }
}

// Scene
const scene = new THREE.Scene()

// Cube
const group = new THREE.Group()
scene.add(group)

const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
group.add(cube1)

// Debug
gui.add(cube1.position, 'y').min(-3).max(3).step(0.01).name('elevation')
gui.add(cube1, 'visible')
gui.add(material, 'wireframe')
gui.addColor(parameters, 'color').onChange((value) => {
  material.color.set(value)
})
gui.add(parameters, 'spin')

gui.domElement.addEventListener('dblclick', (e) => {
  e.stopPropagation()
})

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 2

scene.add(camera)

camera.lookAt(cube1.position)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true

const render = () => {
  requestAnimationFrame(render)
  controls.update()
  renderer.render(scene, camera)
}
requestAnimationFrame(render)
