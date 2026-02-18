/**
 * ExportQualitySettings.js
 * 비디오 내보내기 품질 및 해상도 설정
 *
 * @module ExportQualitySettings
 */

// ============================================================================
// Quality Presets and Configurations
// ============================================================================

/**
 * 품질 프리셋 설정 (CRF 기반)
 * CRF (Constant Rate Factor): 낮을수록 높은 품질, 18-28 권장
 */
export const QUALITY_PRESETS = {
  highest: {
    label: '최고',
    crf: 18,
    preset: 'slow',      // FFmpeg encoding preset
    description: '최고 품질 (파일 크기 큼, 인코딩 느림)'
  },
  high: {
    label: '높음',
    crf: 23,
    preset: 'medium',
    description: '높은 품질 (권장)'
  },
  medium: {
    label: '중간',
    crf: 28,
    preset: 'fast',
    description: '중간 품질 (빠른 인코딩)'
  },
  low: {
    label: '낮음',
    crf: 32,
    preset: 'veryfast',
    description: '낮은 품질 (작은 파일 크기)'
  }
};

/**
 * 해상도 프리셋
 */
export const RESOLUTION_PRESETS = {
  original: {
    label: '원본',
    width: null,
    height: null,
    description: '원본 해상도 유지'
  },
  '1080p': {
    label: '1920x1080 (Full HD)',
    width: 1920,
    height: 1080,
    description: '1080p - 풀 HD'
  },
  '720p': {
    label: '1280x720 (HD)',
    width: 1280,
    height: 720,
    description: '720p - HD'
  },
  '480p': {
    label: '854x480 (SD)',
    width: 854,
    height: 480,
    description: '480p - SD'
  },
  '1080p-vertical': {
    label: '1080x1920 (Full HD 세로)',
    width: 1080,
    height: 1920,
    description: '1080p 세로 - 숏폼/릴스'
  },
  '720p-vertical': {
    label: '720x1280 (HD 세로)',
    width: 720,
    height: 1280,
    description: '720p 세로 - 숏폼/스토리'
  },
  '480p-vertical': {
    label: '480x854 (SD 세로)',
    width: 480,
    height: 854,
    description: '480p 세로'
  }
};

/**
 * FPS (Frame Rate) 프리셋
 */
export const FPS_PRESETS = {
  original: {
    label: '원본',
    fps: null,
    description: '원본 프레임레이트 유지'
  },
  '60': {
    label: '60 FPS',
    fps: 60,
    description: '60fps - 매우 부드러움'
  },
  '30': {
    label: '30 FPS',
    fps: 30,
    description: '30fps - 표준 (권장)'
  },
  '24': {
    label: '24 FPS',
    fps: 24,
    description: '24fps - 영화 스타일'
  },
  '15': {
    label: '15 FPS',
    fps: 15,
    description: '15fps - 낮은 프레임레이트'
  }
};

/**
 * 스케일 모드 프리셋
 */
export const SCALE_MODE_PRESETS = {
  pad: {
    label: '레터박스 (패딩)',
    description: '비율 유지, 검은 여백 추가'
  },
  crop: {
    label: '확대 후 자르기',
    description: '비율 유지, 가운데 기준 잘라내기'
  },
  blur: {
    label: '블러 배경',
    description: '비율 유지, 블러 처리된 영상으로 여백 채우기'
  }
};

// 현재 설정 저장
let currentSettings = {
  quality: 'high',      // 기본값: 높음
  resolution: 'original', // 기본값: 원본
  fps: 'original',      // 기본값: 원본
  scaleMode: 'pad'      // 기본값: 패딩
};

// ============================================================================
// UI Generation Functions
// ============================================================================

/**
 * 품질 설정 UI 생성
 * @param {HTMLElement} container - UI를 삽입할 컨테이너 요소
 */
export function createQualityUI(container) {
  if (!container) return;

  const qualityHTML = `
    <div class="property-group">
      <label for="export-quality">
        <strong>품질</strong>
        <span id="quality-description" style="color: #888; font-size: 12px; margin-left: 8px;">
          ${QUALITY_PRESETS[currentSettings.quality].description}
        </span>
      </label>
      <select id="export-quality" class="form-control" style="width: 100%; padding: 8px; margin-top: 4px;">
        ${Object.entries(QUALITY_PRESETS).map(([key, preset]) => `
          <option value="${key}" ${key === currentSettings.quality ? 'selected' : ''}>
            ${preset.label} (CRF ${preset.crf})
          </option>
        `).join('')}
      </select>
      <small style="color: #666; margin-top: 4px; display: block;">
        CRF 값이 낮을수록 품질이 높지만 파일 크기가 커집니다
      </small>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', qualityHTML);

  // 이벤트 리스너 추가
  const qualitySelect = document.getElementById('export-quality');
  if (qualitySelect) {
    qualitySelect.addEventListener('change', (e) => {
      currentSettings.quality = e.target.value;
      updateQualityDescription();
    });
  }
}

/**
 * 해상도 설정 UI 생성
 * @param {HTMLElement} container - UI를 삽입할 컨테이너 요소
 */
export function createResolutionUI(container) {
  if (!container) return;

  const resolutionHTML = `
    <div class="property-group">
      <label for="export-resolution">
        <strong>해상도</strong>
        <span id="resolution-description" style="color: #888; font-size: 12px; margin-left: 8px;">
          ${RESOLUTION_PRESETS[currentSettings.resolution].description}
        </span>
      </label>
      <select id="export-resolution" class="form-control" style="width: 100%; padding: 8px; margin-top: 4px;">
        ${Object.entries(RESOLUTION_PRESETS).map(([key, preset]) => `
          <option value="${key}" ${key === currentSettings.resolution ? 'selected' : ''}>
            ${preset.label}
          </option>
        `).join('')}
      </select>
    </div>
    <div class="property-group" id="scale-mode-group" style="display: ${currentSettings.resolution !== 'original' ? 'block' : 'none'};">
      <label for="export-scale-mode">
        <strong>비율 조정 방식</strong>
        <span id="scale-mode-description" style="color: #888; font-size: 12px; margin-left: 8px;">
          ${SCALE_MODE_PRESETS[currentSettings.scaleMode].description}
        </span>
      </label>
      <select id="export-scale-mode" class="form-control" style="width: 100%; padding: 8px; margin-top: 4px;">
        ${Object.entries(SCALE_MODE_PRESETS).map(([key, preset]) => `
          <option value="${key}" ${key === currentSettings.scaleMode ? 'selected' : ''}>
            ${preset.label}
          </option>
        `).join('')}
      </select>
      <small style="color: #666; margin-top: 4px; display: block;">
        패딩: 검은 여백 / 자르기: 확대 후 잘라내기 / 블러: 블러 배경 채우기
      </small>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', resolutionHTML);

  // 이벤트 리스너 추가
  const resolutionSelect = document.getElementById('export-resolution');
  if (resolutionSelect) {
    resolutionSelect.addEventListener('change', (e) => {
      currentSettings.resolution = e.target.value;
      updateResolutionDescription();
      // 해상도가 원본이 아닐 때만 스케일 모드 표시
      const scaleModeGroup = document.getElementById('scale-mode-group');
      if (scaleModeGroup) {
        scaleModeGroup.style.display = e.target.value !== 'original' ? 'block' : 'none';
      }
    });
  }

  // 스케일 모드 이벤트 리스너
  const scaleModeSelect = document.getElementById('export-scale-mode');
  if (scaleModeSelect) {
    scaleModeSelect.addEventListener('change', (e) => {
      currentSettings.scaleMode = e.target.value;
      updateScaleModeDescription();
    });
  }
}

/**
 * FPS 설정 UI 생성
 * @param {HTMLElement} container - UI를 삽입할 컨테이너 요소
 */
export function createFpsUI(container) {
  if (!container) return;

  const fpsHTML = `
    <div class="property-group">
      <label for="export-fps">
        <strong>프레임레이트 (FPS)</strong>
        <span id="fps-description" style="color: #888; font-size: 12px; margin-left: 8px;">
          ${FPS_PRESETS[currentSettings.fps].description}
        </span>
      </label>
      <select id="export-fps" class="form-control" style="width: 100%; padding: 8px; margin-top: 4px;">
        ${Object.entries(FPS_PRESETS).map(([key, preset]) => `
          <option value="${key}" ${key === currentSettings.fps ? 'selected' : ''}>
            ${preset.label}
          </option>
        `).join('')}
      </select>
      <small style="color: #666; margin-top: 4px; display: block;">
        낮은 FPS는 파일 크기를 줄이지만 부드러움이 감소합니다
      </small>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', fpsHTML);

  // 이벤트 리스너 추가
  const fpsSelect = document.getElementById('export-fps');
  if (fpsSelect) {
    fpsSelect.addEventListener('change', (e) => {
      currentSettings.fps = e.target.value;
      updateFpsDescription();
    });
  }
}

/**
 * 품질 및 해상도 UI를 한 번에 생성
 * @param {HTMLElement} container - UI를 삽입할 컨테이너 요소
 */
export function createExportQualityUI(container) {
  console.log('[ExportQualitySettings] createExportQualityUI called', {
    container,
    containerExists: !!container,
    containerId: container?.id,
    containerClass: container?.className
  });

  if (!container) {
    console.error('[ExportQualitySettings] Container is null or undefined!');
    return;
  }

  // 기존 품질/해상도/FPS 설정이 있으면 제거
  const existingQuality = container.querySelector('#export-quality');
  const existingResolution = container.querySelector('#export-resolution');
  const existingFps = container.querySelector('#export-fps');
  if (existingQuality) existingQuality.closest('.property-group')?.remove();
  if (existingResolution) existingResolution.closest('.property-group')?.remove();
  if (existingFps) existingFps.closest('.property-group')?.remove();

  // UI 생성
  console.log('[ExportQualitySettings] Creating quality, resolution, and FPS UI...');
  createQualityUI(container);
  createResolutionUI(container);
  createFpsUI(container);
  console.log('[ExportQualitySettings] UI created successfully');
}

/**
 * 품질 설명 업데이트
 */
function updateQualityDescription() {
  const descElement = document.getElementById('quality-description');
  if (descElement && QUALITY_PRESETS[currentSettings.quality]) {
    descElement.textContent = QUALITY_PRESETS[currentSettings.quality].description;
  }
}

/**
 * 해상도 설명 업데이트
 */
function updateResolutionDescription() {
  const descElement = document.getElementById('resolution-description');
  if (descElement && RESOLUTION_PRESETS[currentSettings.resolution]) {
    descElement.textContent = RESOLUTION_PRESETS[currentSettings.resolution].description;
  }
}

/**
 * FPS 설명 업데이트
 */
function updateFpsDescription() {
  const descElement = document.getElementById('fps-description');
  if (descElement && FPS_PRESETS[currentSettings.fps]) {
    descElement.textContent = FPS_PRESETS[currentSettings.fps].description;
  }
}

/**
 * 스케일 모드 설명 업데이트
 */
function updateScaleModeDescription() {
  const descElement = document.getElementById('scale-mode-description');
  if (descElement && SCALE_MODE_PRESETS[currentSettings.scaleMode]) {
    descElement.textContent = SCALE_MODE_PRESETS[currentSettings.scaleMode].description;
  }
}

// ============================================================================
// Settings Getters
// ============================================================================

/**
 * 현재 품질 설정 가져오기
 * @returns {Object} 품질 설정 객체 { crf, preset, label }
 */
export function getQualitySettings() {
  return QUALITY_PRESETS[currentSettings.quality];
}

/**
 * 현재 해상도 설정 가져오기
 * @returns {Object} 해상도 설정 객체 { width, height, label }
 */
export function getResolutionSettings() {
  return RESOLUTION_PRESETS[currentSettings.resolution];
}

/**
 * FPS 설정 가져오기
 * @returns {Object} FPS 설정 객체 { fps, label }
 */
export function getFpsSettings() {
  return FPS_PRESETS[currentSettings.fps];
}

/**
 * 스케일 모드 설정 가져오기
 * @returns {Object} 스케일 모드 설정 객체 { label, description }
 */
export function getScaleModeSettings() {
  return SCALE_MODE_PRESETS[currentSettings.scaleMode];
}

/**
 * 모든 설정 가져오기
 * @returns {Object} { quality, resolution, fps, scaleMode, qualityPreset, resolutionPreset, fpsPreset, scaleModePreset }
 */
export function getAllExportSettings() {
  return {
    quality: currentSettings.quality,
    resolution: currentSettings.resolution,
    fps: currentSettings.fps,
    scaleMode: currentSettings.scaleMode,
    qualityPreset: QUALITY_PRESETS[currentSettings.quality],
    resolutionPreset: RESOLUTION_PRESETS[currentSettings.resolution],
    fpsPreset: FPS_PRESETS[currentSettings.fps],
    scaleModePreset: SCALE_MODE_PRESETS[currentSettings.scaleMode]
  };
}

/**
 * FFmpeg용 인코딩 매개변수 생성
 * @param {Object} options - 추가 옵션
 * @returns {Array} FFmpeg 인수 배열
 */
export function getFFmpegEncodingArgs(options = {}) {
  const quality = QUALITY_PRESETS[currentSettings.quality];
  const resolution = RESOLUTION_PRESETS[currentSettings.resolution];
  const fpsPreset = FPS_PRESETS[currentSettings.fps];

  const args = [];
  const filters = [];
  let useFilterComplex = false;
  let filterComplexStr = '';

  // 해상도 필터 (원본이 아닌 경우)
  if (resolution.width && resolution.height) {
    const w = resolution.width;
    const h = resolution.height;
    if (currentSettings.scaleMode === 'blur') {
      // 블러 배경 모드: 확대+블러 배경 위에 원본 비율 영상 오버레이
      useFilterComplex = true;
      filterComplexStr = `[0:v]scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},gblur=sigma=20[bg];[0:v]scale=${w}:${h}:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1`;
    } else if (currentSettings.scaleMode === 'crop') {
      // 확대 후 가운데 기준 잘라내기 (increase: 지정 해상도보다 크게 확대)
      filters.push(`scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},setsar=1`);
    } else {
      // 패딩 모드: 비율 유지하면서 검은 여백 추가
      filters.push(`scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2,setsar=1`);
    }
  }

  // FPS 필터 (원본이 아닌 경우)
  if (fpsPreset.fps) {
    if (useFilterComplex) {
      filterComplexStr += `,fps=${fpsPreset.fps}`;
    } else {
      filters.push(`fps=${fpsPreset.fps}`);
    }
  }

  // 필터 적용
  if (useFilterComplex) {
    args.push('-filter_complex', filterComplexStr);
  } else if (filters.length > 0) {
    args.push('-vf', filters.join(','));
  }

  // 비디오 코덱 및 품질 설정
  args.push(
    '-c:v', 'libx264',           // H.264 코덱 사용
    '-crf', quality.crf.toString(), // CRF 값
    '-preset', quality.preset,    // 인코딩 프리셋
    '-pix_fmt', 'yuv420p'         // 호환성을 위한 픽셀 포맷
  );

  // FPS 설정 (원본이 아닌 경우 -r 옵션 추가)
  if (fpsPreset.fps) {
    args.push('-r', fpsPreset.fps.toString());
  }

  // 오디오 설정
  args.push(
    '-c:a', 'aac',               // AAC 오디오 코덱
    '-b:a', '192k',              // 오디오 비트레이트
    '-ar', '48000',              // 샘플 레이트
    '-ac', '2'                   // 스테레오 채널
  );

  return args;
}

/**
 * 설정 초기화
 */
export function resetSettings() {
  currentSettings = {
    quality: 'high',
    resolution: 'original',
    fps: 'original'
  };
}

/**
 * 설정 값 직접 설정 (프로그래밍 방식)
 * @param {string} quality - 품질 프리셋 키 (highest, high, medium, low)
 * @param {string} resolution - 해상도 프리셋 키 (original, 1080p, 720p, 480p)
 * @param {string} fps - FPS 프리셋 키 (original, 60, 30, 24, 15)
 */
export function setSettings(quality, resolution, fps) {
  if (QUALITY_PRESETS[quality]) {
    currentSettings.quality = quality;
  }
  if (RESOLUTION_PRESETS[resolution]) {
    currentSettings.resolution = resolution;
  }
  if (FPS_PRESETS[fps]) {
    currentSettings.fps = fps;
  }
}

// ============================================================================
// 디버그용 로깅
// ============================================================================

/**
 * 현재 설정 출력
 */
export function logCurrentSettings() {
  console.log('[Export Quality Settings]', {
    quality: currentSettings.quality,
    qualityPreset: QUALITY_PRESETS[currentSettings.quality],
    resolution: currentSettings.resolution,
    resolutionPreset: RESOLUTION_PRESETS[currentSettings.resolution],
    fps: currentSettings.fps,
    fpsPreset: FPS_PRESETS[currentSettings.fps],
    ffmpegArgs: getFFmpegEncodingArgs()
  });
}
