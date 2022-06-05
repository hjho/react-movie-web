export const useNotification = (title, options) => {
    if(!("Notification" in window)) {
        // return;
    }
    const fireNotif = () => {
        if(Notification.permission === "granted") {
            new Notification(title, options);
        } else {
            Notification.requestPermission().then(permission => {
                if(permission === "granted") {
                    new Notification(title, options);
                } else {
                    return;
                }
            });
        }
    }
    return fireNotif;
}
// const triggerNotif = useNotification(
//      "Can i steal your kimchi?", 
//      {body:"I love kimchi dont you"}
// );

// window > 작업표시줄 하단 메시지 아이콘 > 우측 상단 알림관리 > 알림받기 ON 