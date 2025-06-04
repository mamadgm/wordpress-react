<?php
/*
Plugin Name: Hezartoo.mammutepd.ir/gemification
Description: یک عدد کلید که توسط اطلاعات ساده کاربر وارد یک سایت دیگر می شود
Version: 0.1
Author: mamadgmyou4
*/


/*

در المنتور، ابزارک 
Shortcode 
را اضافه کنید و داخل آن این متن را قرار دهید:

[send_user_info_button]

این دکمه فقط برای کاربران واردشده نمایش داده می‌شود و با کلیک روی آن، اطلاعات کاربر به سایت مقصد ارسال می‌شود.

که در نهایت وارد سایت آزمون می شوند 

البته که باید بجای تلفن از ایمیل یا مقدار دیگری به عنوان مقدار غیر تکراری استفاده کنیم

*/

add_shortcode( 'send_user_info_button', function() {
    if ( !is_user_logged_in() ) return '';

    return '
        <form method="post" action="' . esc_url( admin_url('admin-post.php') ) . '">
            <input type="hidden" name="action" value="send_user_info">
            ' . wp_nonce_field('send_user_info_nonce', '_wpnonce', true, false) . '
            <button type="submit">Send My Info</button>
        </form>
    ';
});

add_action( 'admin_post_send_user_info', function() {
    if ( ! is_user_logged_in() || ! check_admin_referer('send_user_info_nonce') ) {
        wp_die( 'Unauthorized', 403 );
    }

    $user = wp_get_current_user();
 
    // ارسال اطلاعات در ایجا قرار دارد
    // Use user ID as phone number for now (we can use email too)
    $first_name   = urlencode($user->user_firstname);
    $last_name    = urlencode($user->user_lastname);
    $phone_number = urlencode($user->ID); // fake phone for now

    // Build the redirect URL
    $redirect_url = "https://mamadgm.github.io/wordpress-react/?first_name={$first_name}&last_name={$last_name}&phone_number={$phone_number}";

    wp_redirect($redirect_url);
    exit;
});

