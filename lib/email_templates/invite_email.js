export function inviteEmail(link) {
    const emailHtml =  `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
<h2 style="color: #333;">Welcome to Nash Browns Media 🎉</h2>
<p>Click the button below to create your account and view your company's exposure:</p>
<p>
<a href="${link}"
style="display: inline-block; padding: 12px 20px; color: #fff; background-color: #4f46e5; text-decoration: none; border-radius: 6px; font-weight: bold;"
>
Join Nash Browns Media
</a>
</p>
<p style="font-size: 0.9em; color: #777;">If you weren't expecting this email, you can safely ignore it.</p>
</div>
`
   return emailHtml 
}
