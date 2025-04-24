export const calFragmentSize = (sizeInMB: number | null) : string => {
        if (!sizeInMB) return '0 Bytes';
        
        if (sizeInMB >= 1) {
          return `${sizeInMB.toFixed(2)} MB`;
        } else if (sizeInMB >= 0.001) {
          return `${(sizeInMB * 1024).toFixed(2)} KB`;
        } else {
          return `${(sizeInMB * 1024 * 1024).toFixed(0)} Bytes`;
        }
      }
